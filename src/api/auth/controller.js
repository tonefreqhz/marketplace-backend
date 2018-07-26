/*
* File /auth/controller.js
* @desc It handles User users Login and Signup
* @author 4Dcoder
* @date 18 July 2018
* @params publicAddress for metamask
*
*/

import ethUtil from "ethereumjs-util";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import Admin from "./../admin/model";
import Vendor from "./../vendor/model";
import Customer from "./../customer/model";
import { getClientAccess, addToAccess } from "./../../services/helpers";
import { success, fail, notFound } from "./../../services/response";
import { jwtSecret, getToken } from "./../../services/jwt";


// ///////////////////////////////////////////////////
// 1. First, find the record with public Address
// /:userType/:authType/publicaddress/:publicAddress
// //////////////////////////////////////////////////
export const find = (req, res, next) => {
  let User = null;
  const { userType, authType, publicAddress } = req.params;
  console.log(`User Type: ${userType} Auth Type: ${authType} publicAddress: ${publicAddress}`);
  if (!userType || !authType || !publicAddress) {
    return fail(res, 401, "Request should have a Metamask address or auth  and user type");
  }

  switch (userType) {
    case "admin": User = Admin;
      break;
    case "vendor": User = Vendor;
      break;
    case "customer": User = Customer;
      break;
    default: User = null;
  }

  if (!User) {
    return fail(res, 401, "Request should have a valid user type");
  }

  return User.findOne({ publicAddress }).exec()
    .then((user) => {
      if ((!user && authType === "login") || (user && authType === "signup")) {
        const msg = authType === "login" ? "is not found, please signup" : "ialready exist, please login";
        return fail(res, 401, `User with publicAddress ${publicAddress} ${msg} `);
      }

      // Create a User
      if ((!user && authType === "signup")) {
        const newUser = new User({
          publicAddress,
          username: "",
          fullname: "",
          phone: "",
          address: "",
          email: "",
        });

        if (userType === "vendor") {
          newUser.domain_name = publicAddress;
        }

        // Save User in the database
        return newUser.save()
          .then(record => success(res, 200, { publicAddress, nonce: record.nonce, authType: "signup" }, "new User record has been created"))
          .catch(err => fail(res, 500, err.message || "Some error occurred while creating the User."));
      }
      if ((user && authType === "login")) {
        return success(res, 200, { publicAddress, nonce: user.nonce, authType }, "Login successful!");
      }
      return fail(res, 500, "Unknown error finding user.");
    })
    .catch(next);
};

// ///////////////////////////////////////////////////
// 2. Secondly, the signed message is posted with publicAddress
// /{post} /:userType/auth/:authType Authenticate
// body { signature, publicAddress }
// returns the accessToken if Authentication is successful
// //////////////////////////////////////////////////
export const auth = (req, res, next) => {
  let User = null;
  const { signature, publicAddress } = req.body;
  const { userType, authType } = req.params;
  console.log(`${signature}, ${publicAddress} ${userType}, ${authType}`);
  if (!signature || !publicAddress) {
    return fail(res, 401, "Request should have signature and publicAddress");
  }

  switch (userType) {
    case "admin": User = Admin;
      break;
    case "vendor": User = Vendor;
      break;
    case "customer": User = Customer;
      break;
    default: User = null;
  }

  return User.findOne({ publicAddress }).exec()

  // //////////////////////////////////////////////////
  // Step 1: Get the user with the given publicAddress
  // //////////////////////////////////////////////////

    .then((user) => {
      if (!user) {
        return fail(res, 401, `User with publicAddress ${publicAddress} is not found in database. Signup`);
      }
      const clientAccess = getClientAccess(req);
      // Log last_access
      user.last_access = addToAccess(user.last_access, 10, clientAccess);
      user.save()
        .then(record => record)
        .catch(err => console.log(err.message || "Unable to update user access log."));
      return user;
    })

  // //////////////////////////////////////////////////
  // Step 2: Verify digital signature
  // //////////////////////////////////////////////////

    .then((user) => {
      const msg = `I am signing my one-time nonce: ${user.nonce} to ${authType}`;

      // We now are in possession of msg, publicAddress and signature. We
      // can perform an elliptic curve signature verification with ecrecover
      const msgBuffer = ethUtil.toBuffer(msg);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s,
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addressBuffer);

      // The signature verification is successful if the address found with
      // ecrecover matches the initial publicAddress
      if (address.toLowerCase() !== publicAddress.toLowerCase()) {
        return fail(res, 401, "Signature verification failed");
      }
      return user;
    })

  // //////////////////////////////////////////////////
  // Step 3: Generate a new nonce for the user
  // //////////////////////////////////////////////////
  /* REMOVE THIS LINE AFTER TESTING
    .then((user) => {
      user.nonce = randomNonce();
      return user.save()
        .then(data => data)
        .catch((err) => {
          fail(res, 401, err.message || "Error occurred while creating user record");
        });
    })
*/
  // //////////////////////////////////////////////////
  // Step 4: Create JWT
  // //////////////////////////////////////////////////

    .then(user =>
      new Promise((resolve, reject) =>
      // https://github.com/auth0/node-jsonwebtoken
        jwt.sign(
          {
            payload: {
              id: user.id,
              publicAddress,
            },
          },
          jwtSecret,
          null,
          (err, token) => {
            if (err) {
              return reject(err);
            }
            return resolve(token);
          },
        )))
    .then(accessToken => success(res, 200, { accessToken }, "Authentication successful!"))
    .catch(next);
};


// Authorize to access admin protected route
export function isValidAdmin(req, res, next) {
  const accessToken = getToken(req);
  console.log(`\r\n******\r\nAuthorizing token: ${accessToken}`);

  if (!req.params) {
    return fail(res, 403, "Authentication Failed: invalid request parameters.");
  }

  if (!accessToken) {
    return fail(res, 403, "Authentication Failed: undefined token.");
  }

  const { payload: { id, publicAddress } } = jwtDecode(accessToken);
  console.log(`\r\n-id: ${id}`);

  return Admin.findOne({ publicAddress }).exec()
  // Step 1: Get the admin with the given publicAddress
    .then((admin) => {
      if (!admin) return notFound(res, `Admin with publicAddress ${publicAddress} is not found in database.`);
      return admin;
    })

  // Step 2: Verify address
    .then((admin) => {
      if ((admin.publicAddress.toLowerCase() !== publicAddress.toLowerCase())
      || (admin.id !== id)) {
        return fail(res, 401, "Admin verification failed");
      }
      res.locals.userId = id;
      res.locals.userType = "admin";
      return next();
    });
}

// Authorize to access Vendor protected route
export function isValidVendor(req, res, next) {
  const accessToken = getToken(req);
  console.log(`\r\n******\r\nAuthorizing token: ${accessToken}`);

  if (!req.params) {
    return fail(res, 403, "Authentication Failed: invalid request parameters.");
  }

  if (!accessToken) {
    return fail(res, 403, "Authentication Failed: undefined token.");
  }

  const { payload: { id, publicAddress } } = jwtDecode(accessToken);
  console.log(`\r\n-id: ${id}`);

  return Vendor.findOne({ publicAddress }).exec()
  // Step 1: Get the vendor with the given publicAddress
    .then((vendor) => {
      if (!vendor) return notFound(res, `Vendor with publicAddress ${publicAddress} is not found in database.`);
      return vendor;
    })

  // Step 2: Verify address
    .then((vendor) => {
      if ((vendor.publicAddress.toLowerCase() !== publicAddress.toLowerCase())
      || (vendor.id !== id)) {
        return fail(res, 401, "Vendor verification failed");
      }
      res.locals.userId = id;
      res.locals.userType = "vendor";
      return next();
    });
}


// Authorize to access Customer protected route
export function isValidCustomer(req, res, next) {
  const accessToken = getToken(req);
  console.log(`\r\n******\r\nAuthorizing token: ${accessToken}`);

  if (!req.params) {
    return fail(res, 403, "Authentication Failed: invalid request parameters.");
  }

  if (!accessToken) {
    return fail(res, 403, "Authentication Failed: undefined token.");
  }

  const { payload: { id, publicAddress } } = jwtDecode(accessToken);
  console.log(`\r\n-id: ${id}`);

  return Customer.findOne({ publicAddress }).exec()
  // Step 1: Get the customer with the given publicAddress
    .then((customer) => {
      if (!customer) return notFound(res, `Customer with publicAddress ${publicAddress} is not found in database.`);
      return customer;
    })

  // Step 2: Verify address
    .then((customer) => {
      if ((customer.publicAddress.toLowerCase() !== publicAddress.toLowerCase())
      || (customer.id !== id)) {
        return fail(res, 401, "Customer verification failed");
      }
      res.locals.userId = id;
      res.locals.userType = "customer";
      return next();
    });
}
