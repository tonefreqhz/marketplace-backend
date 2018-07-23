import { success, fail } from "./../../services/response/";
import Admin from "./model";
import Vendor from "../vendor/model";
import Product from "../product/model";
import Category from "../category/model";
import Blog from "../blog/model";
import Brand from "../brand/model";
import Coupon from "../coupon/model";
import Currency from "../currency/model";
import Customer from "../customer/model";
import Language from "../language/model";
import LanguageList from "../languageList/model";
import Order from "../order/model";
import Review from "../review/model";
import Stock from "../stock/model";
import Subscriber from "../subscriber/model";
import Media from "../media/model";
import Template from "../template/model";
import Slider from "../slider/model";
import Mail from "../mail/model";
import Message from "../message/model";
import Ticket from "../ticket/model";
import Setting from "../setting/model";

// /////////////////////////////////////
// initAdmin
// ////////////////////////////////////

let admin = {
  nonce: 909091,
  username: "Tricy",
  role: "admin",
  last_access: [
    {
      accessDate: "",
      ipAddress: "",
    },
  ],
  fullname: "Yoh Trinity",
  phone: "00128065544",
  address: "Lekki Phase II",
  email: "yohanne@yahoo.com",
  standing: "active",
  _id: "5b4738c933b975588b4ae745",
  publicAddress: "0x1b19bfacc9fbcedd42deed4fe200beb039ecd1e1",
  updated: "2018-07-12T11:17:29.845Z",
  createdAt: "2018-07-12T11:17:29.861Z",
  updatedAt: "2018-07-14T18:41:29.349Z",
  __v: 0,
};

export function initAdmin(req, res) {
  const admin1 = new Admin({
    nonce: 1234,
    publicAddress: "0x1B19BfaCc9FbcEDD42DEed4FE200BEb039eCd1E7",
    username: "nditah",
    role: "master",
    fullname: "Nditah Sam",
    phone: "08134836164",
    address: "No7 Bright Estate, Lekki Phase I, Lagos",
    email: "nditah@gmail.com",
  });

  admin1.save()
    .then((adminResult) => {
      if (!adminResult) {
        fail(res, 404, "Error not found newly added admin");
      }
      admin = Object.assign({}, adminResult);
      console.log(`\r\nAdmin is added ${admin}`);
      return success(res, 200, adminResult, "Done Initializing Admin Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding admin ${err.message}`);
    });
}

// /////////////////////////////////////
// initVendor
// ////////////////////////////////////

let vendor = {
  nonce: 384127,
  username: "James",
  last_access: [{ accessDate: "", ipAddress: "" }],
  fullname: "Edward",
  phone: "09089999222222",
  address: "Agu Awka",
  email: "james@awka.an",
  standing: "active",
  _id: "5b54e618ae6b2a035fe83843",
  publicAddress: "0x1b19bfacc9fbcedd42deed4fe200beb039ecd1e0",
  updated: "2018-07-22T20:16:24.678Z",
  createdAt: "2018-07-22T20:16:24.687Z",
  updatedAt: "2018-07-22T20:20:53.093Z",
  __v: 0,
};

export function initVendor(req, res) {
  const vendor1 = new Vendor({
    nonce: 34635564,
    publicAddress: "0x1B19BfaCc9FbcEDD42DEed4FE200BEb039eCd1E0",
    username: "blaze",
    fullname: "Blaze Billy",
    phone: "08134836164",
    address: "No7 Bright Estate, Lekki Phase I, Lagos",
    email: "billy@gmail.com",
    domain_name: "SolidOxford",
    business_name: "Solid Oxford Enterprises",
    language: "English",
    password: "wendy7678",
    tagline: "solidOxford",
    details: "solidOxford",
    website: "http://www.solidOxford.com",
    facebook: "facebook.com/solidOxford",
    skype: "@solidOxford",
    google_plus: "@solidOxford",
    twitter: "@solidOxford",
    youtube: "@solidOxford",
    pinterest: "@solidOxford",
    tag: "wears",
    description: "Blaze Fashion Design Unlimited",
    country: "U.S.A",
    city: "Dallas",
    zip: "10201",
    state: "Texas",
    theme: "light",
    logo: "logo",
    banner: "banner",
    home_page_style: "light",
    product_page_style: "dark",
    product_detail_page_style: "dark",
    profile_page_style: "dark",
    blog_page_style: "dark",
    mail_page_style: "dark",
    invoice_page_style: "dark",
    ticket_page_style: "dark",
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  vendor1.save()
    .then((vendorResult) => {
      if (!vendorResult) {
        fail(res, 404, "Error not found newly added vendor");
      }
      vendor = Object.assign({}, vendorResult);
      console.log(`\r\nAdmin is added ${vendor}`);
      return success(res, 200, vendorResult, "Done Initializing Vendor Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding vendor ${err.message}`);
    });
}


// /////////////////////////////////////
// initCurrency
// ////////////////////////////////////

let currency = {
  description: "Your Currency",
  icon: "default-currency-icon.png",
  view_count: 1,
  standing: "active",
  _id: "5b559970dc79a83543dddb60",
  name: "Your Currency",
  code: "??",
  kind: "fiat",
  symbol: "?",
  exchange: 0,
  approvedAt: "2018-07-23T09:01:36.276Z",
  updated: "2018-07-23T09:01:36.276Z",
  createdAt: "2018-07-23T09:01:36.286Z",
  updatedAt: "2018-07-23T09:01:36.286Z",
  __v: 0,
};

export function initCurrency(req, res) {
  const currency1 = new Currency({
    name: "U.S Dollar",
    code: "USD",
    description: "Currency of the United States of America",
    kind: "fiat",
    symbol: "$",
    exchange: 1.00,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency1.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
      currency = Object.assign({}, currencyResult);
      console.log(`\r\nCurrency is added ${currency}`);
      return success(res, 200, currencyResult, "Done Initializing Vendor Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency2 = new Currency({
    name: "Austrian Dollar",
    code: "AUD",
    description: "Currency of Australia",
    kind: "fiat",
    symbol: "$",
    exchange: 1.3163,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency2.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency3 = new Currency({
    name: "Brazilian Real",
    code: "BRL",
    description: "Currency of Brazil",
    kind: "fiat",
    symbol: "R$",
    exchange: 3.2953,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency3.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency4 = new Currency({
    name: "Canadian Dollar",
    code: "CAD",
    description: "Currency of Canada",
    kind: "fiat",
    symbol: "$",
    exchange: 1.3199,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency4.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency5 = new Currency({
    name: "Czech Koruna",
    code: "CZK",
    description: "Currency of Czech Republic",
    kind: "fiat",
    symbol: "Kč",
    exchange: 24.212,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency5.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency6 = new Currency({
    name: "Danish Krone",
    code: "DKK",
    description: "Currency of Denmark",
    kind: "fiat",
    symbol: "Kr",
    exchange: 6.6675,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency6.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency7 = new Currency({
    name: "Euro",
    code: "EUR",
    description: "Currency of United Kingdom",
    kind: "fiat",
    symbol: "€",
    exchange: 0.89079,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency7.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency8 = new Currency({
    name: "Hong Kong Dollar",
    code: "HKD",
    description: "Currency of China",
    kind: "fiat",
    symbol: "$",
    exchange: 7.7587,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency8.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency9 = new Currency({
    name: "Hungarian Forint",
    code: "HUF",
    description: "Currency of Hungaria",
    kind: "fiat",
    symbol: "Ft",
    exchange: 275.38,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency9.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency10 = new Currency({
    name: "Israeli New Sheqel",
    code: "ILS",
    description: "Currency of Israel",
    kind: "fiat",
    symbol: "₪",
    exchange: 3.7896,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency10.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency11 = new Currency({
    name: "Japanese Yen",
    code: " JPY",
    description: "Currency of Japan",
    kind: "fiat",
    symbol: "¥",
    exchange: 101.86,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency11.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency12 = new Currency({
    name: "Malaysian Ringgit",
    code: " MYR",
    description: "Currency of Malaysia",
    kind: "fiat",
    symbol: "RM",
    exchange: 4.1369,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency12.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency13 = new Currency({
    name: "Mexico Peso",
    code: " MXN",
    description: "Currency of Mexico",
    kind: "fiat",
    symbol: "$",
    exchange: 19.389,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency13.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency14 = new Currency({
    name: "Norwegian Krone",
    code: " NOK",
    description: "Currency of Norway",
    kind: "fiat",
    symbol: "kr",
    exchange: 8.2509,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency14.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency15 = new Currency({
    name: "New Zealand Dollar",
    code: " NZD",
    description: "Currency of New Zealand",
    kind: "fiat",
    symbol: "$",
    exchange: 1.3689,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency15.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency16 = new Currency({
    name: "Philippine Peso",
    code: "PHP",
    description: "Currency of Philipine",
    kind: "fiat",
    symbol: "₱",
    exchange: 47.872,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency16.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency17 = new Currency({
    name: "Polish Zloty",
    code: "PLN",
    description: "Currency of Poland",
    kind: "fiat",
    symbol: "zł",
    exchange: 3.8453,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency17.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency18 = new Currency({
    name: "Pound Sterling",
    code: "GBP",
    description: "Currency of United Kingdom",
    kind: "fiat",
    symbol: "£",
    exchange: 0.75898,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency18.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency19 = new Currency({
    name: "Russia Ruble",
    code: "RUB",
    description: "Currency of Russia",
    kind: "fiat",
    symbol: "py6",
    exchange: 64.936,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency19.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency20 = new Currency({
    name: "Singapore Dollar",
    code: "SGD",
    description: "Currency of Singapore",
    kind: "fiat",
    symbol: "$",
    exchange: 1.3645,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency20.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });


  const currency21 = new Currency({
    name: "Swedish Krone",
    code: "SEK",
    description: "Currency of Sweden",
    kind: "fiat",
    symbol: "kr",
    exchange: 0.75898,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency21.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency22 = new Currency({
    name: "Swiss Franc",
    code: "CHF",
    description: "Currency of Sweden",
    kind: "fiat",
    symbol: "CHF",
    exchange: 0.97461,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency22.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency23 = new Currency({
    name: "Thai Baht",
    code: "THB",
    description: "Currency of Thailand",
    kind: "fiat",
    symbol: "฿",
    exchange: 34.91,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency23.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });

  const currency24 = new Currency({
    name: "Your Currency",
    code: "??",
    description: "Your Currency",
    kind: "fiat",
    symbol: "?",
    exchange: 0.00,
    approvedBy: admin._id,
    approvedAt: Date.now(),
  });

  currency24.save()
    .then((currencyResult) => {
      if (!currencyResult) {
        fail(res, 404, "Error not found newly added currency");
      }
      return success(res, 200, currencyResult, "Done Initializing Vendor Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding currency ${err.message}`);
    });
}


// /////////////////////////////////////
// initLanguage
// ////////////////////////////////////

export function initLanguage(req, res) {
  const language1 = new Language({
    word_id: 1,
    word: "visit_home_page",
    english: "Visit Home Page",
    french: "visite page d'accueil",
    spanish: "visita la página de inicio",
    bangla: "দর্শন হোম পেজে",
    arabic: "الصفحة الرئيسية زيارة ",
    chinese: "访问主页",
  });

  language1.save()
    .then((languageResult) => {
      if (!languageResult) {
        fail(res, 404, "Error not found newly added language");
      }
      return success(res, 200, languageResult, "Done Initializing language Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding language ${err.message}`);
    });
}

// /////////////////////////////////////
// initLanguageList
// ////////////////////////////////////

let languageList = {
  standing: "active",
  _id: "5b5599d7ad92653576aa718b",
  name: "Bangla",
  db_field: "bangla",
  icon: "BN",
  updated: "2018-07-23T09:03:19.763Z",
  createdAt: "2018-07-23T09:03:19.767Z",
  updatedAt: "2018-07-23T09:03:19.767Z",
  __v: 0,
};

export function initLanguageList(req, res) {
  const languageList1 = new LanguageList({
    name: "English",
    db_field: "english",
    icon: "EN",
  });

  languageList1.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      console.log(`\r\nlanguageList is added ${languageList1}`);
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });

  const languageList2 = new LanguageList({
    name: "French",
    db_field: "french",
    icon: "FR",
  });

  languageList2.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      console.log(`\r\nlanguageList is added ${languageList2}`);
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });

  const languageList3 = new LanguageList({
    name: "Spanish",
    db_field: "spanish",
    icon: "SP",
  });

  languageList3.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      console.log(`\r\nlanguageList is added ${languageList3}`);
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });

  const languageList4 = new LanguageList({
    name: "Chinese",
    db_field: "chinese",
    icon: "CN",
  });

  languageList4.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      console.log(`\r\nlanguageList is added ${languageList4}`);
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });

  const languageList5 = new LanguageList({
    name: "Arabic",
    db_field: "arabic",
    icon: "AR",
  });

  languageList5.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      console.log(`\r\nlanguageList is added ${languageList5}`);
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });

  const languageList6 = new LanguageList({
    name: "Bangla",
    db_field: "bangla",
    icon: "BN",
  });

  languageList6.save()
    .then((languageListResult) => {
      if (!languageListResult) {
        fail(res, 404, "Error not found newly added languageList");
      }
      languageList = Object.assign({}, languageListResult);
      console.log(`\r\nlanguageList is added ${languageList}`);
      return success(res, 200, languageListResult, "Done Initializing languageList Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding languageList ${err.message}`);
    });
}

// /////////////////////////////////////
// initCategory
// ////////////////////////////////////

let category = {
  parent: "0",
  view_count: 1,
  standing: "active",
  _id: "5b5595ea65bbd42e261016bc",
  icon: "default-category-icon.png",
  banner: "default-category-banner.png",
  name: "Cars",
  description: "Vehicles Cars",
  kind: "physical",
  vendor: "5b54e618ae6b2a035fe83843",
  updated: "2018-07-23T08:46:43.719Z",
  createdAt: "2018-07-23T08:46:43.721Z",
  updatedAt: "2018-07-23T08:46:43.721Z",
  __v: 0,
};

export function initCategory(req, res) {
  const category1 = new Category({
    icon: "default-category-icon.png",
    banner: "default-category-banner.png",
    name: "Cars",
    description: "Vehicles Cars",
    kind: "physical",
    parent: "0",
    vendor: vendor._id,
  });

  category1.save()
    .then((categoryResult) => {
      if (!categoryResult) {
        fail(res, 404, "Error not found newly added category");
      }
      category = Object.assign({}, categoryResult);
      console.log(`\r\ncategoryResult is added ${categoryResult}`);
      return success(res, 200, categoryResult, "Done Initializing category Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding category ${err.message}`);
    });
}

// /////////////////////////////////////
// initBrand
// ////////////////////////////////////

let brand = {
  view_count: 1,
  standing: "active",
  _id: "5b5595f365bbd42e261016bd",
  name: "Toyota",
  description: "trending men and women wears, accessories and shoes",
  icon: "default-category-icon.png",
  banner: "default-category-banner.png",
  vendor: "5b54e618ae6b2a035fe83843",
  updated: "2018-07-23T08:46:43.719Z",
  createdAt: "2018-07-23T08:46:43.721Z",
  updatedAt: "2018-07-23T08:46:43.721Z",
  __v: 0,
};

export function initBrand(req, res) {
  const brand1 = new Brand({
    name: "Toyota",
    description: "trending men and women wears, accessories and shoes",
    icon: "default-category-icon.png",
    banner: "default-category-banner.png",
    vendor: vendor._id,
  });

  brand1.save()
    .then((brandResult) => {
      if (!brandResult) {
        fail(res, 404, "Error not found newly added brand");
      }
      brand = Object.assign({}, brandResult);
      console.log(`\r\nbrandResultis added ${brandResult}`);
      return success(res, 200, brandResult, "Done Initializing brand Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding brand ${err.message}`);
    });
}

// /////////////////////////////////////
// initProduct
// ////////////////////////////////////

let product = {
  code: "5647",
  sku: "577478394854",
  upc: "344-455-454-344",
  tag: [
    "shoe",
  ],
  shipping_cost: 2,
  image_sm: "small",
  image_md: "medium",
  image_lg: "large",
  image_front: "front",
  image_back: "back",
  image_top: "default-product-top-image.jpg",
  image_bottom: "default-product-bottom-image.jpg",
  image_right: "default-product-right-image.jpg",
  image_left: "default-product-left-image.jpg",
  icon: "default-product-icon.jpg",
  unit: "2",
  length: "3m",
  width: "1.5m",
  height: "1.2m",
  color: "red",
  options: "none",
  discount: 5,
  discount_type: "percent",
  tax: 4,
  tax_type: "percent",
  download: true,
  download_name: "bezop-toyota-corolla",
  deal: false,
  valuation: "LIFO",
  download_num: 3453,
  featured: true,
  view_count: 1,
  standing: "active",
  _id: "5b55979956bed531379b0aa3",
  name: "Corolla E",
  vendor: "5b54e618ae6b2a035fe83843",
  category: "5b5595ea65bbd42e261016bc",
  brand: "5b5595f365bbd42e261016bd",
  description: "Corolla E, hybrid electric car",
  short_description: "Sports racing car",
  unit_cost: 23,
  unit_price: 26,
  view_date: "2018-07-23T08:53:45.490Z",
  updated: "2018-07-23T08:53:45.490Z",
  createdAt: "2018-07-23T08:53:45.563Z",
  updatedAt: "2018-07-23T08:53:45.563Z",
};

export function initProduct(req, res) {
  const product1 = new Product({
    code: "5647",
    sku: "577478394854",
    upc: "344-455-454-344",
    name: "Corolla E",
    tag: ["shoe"],
    vendor,
    category,
    brand,
    description: "Corolla E, hybrid electric car",
    short_description: "Sports racing car",
    unit_cost: "23.00",
    unit_price: "26.00",
    shipping_cost: "2.00",
    image_sm: "small",
    image_md: "medium",
    image_lg: "large",
    image_front: "front",
    image_back: "back",
    logo: "logo",
    unit: "2",
    length: "3m",
    width: "1.5m",
    height: "1.2m",
    color: "red",
    options: "none",
    discount: "5",
    tax: "4",
    tax_type: "percent",
    discount_type: "percent",
    download: "1",
    download_name: "bezop-toyota-corolla",
    valuation: "LIFO",
    download_num: "3453",
    featured: true,
    deal: false,
  });

  product1.save()
    .then((productResult) => {
      if (!productResult) {
        fail(res, 404, "Error not found newly added product");
      }
      product = Object.assign({}, productResult);
      console.log(`\r\nbrand is added ${productResult}`);
      return success(res, 200, productResult, "Done Initializing product Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding product ${err.message}`);
    });
}

// /////////////////////////////////////
// initStock
// ////////////////////////////////////

let stock = {
  vendor: [
    "5b54e618ae6b2a035fe83843",
  ],
  products: [
    "5b55979956bed531379b0aa3",
  ],
  available: 20,
  standing: "active",
  _id: "5b5598dec860633406bae2a4",
  vendor_id: "5b54e618ae6b2a035fe83843",
  order_num: "678h7",
  kind: "add",
  quantity: 20,
  unit_cost: 34,
  unit_price: 36,
  description: "Toyota Corolla Stock",
  updated: "2018-07-23T08:59:10.300Z",
  createdAt: "2018-07-23T08:59:10.303Z",
  updatedAt: "2018-07-23T08:59:10.303Z",
  __v: 0,
};

export function initStock(req, res) {
  const stock1 = new Stock({
    vendor,
    product,
    order_num: "678h7",
    kind: "add",
    quantity: 20,
    available: 20,
    unit_cost: 34.00,
    unit_price: 36.00,
    description: "Toyota Corolla Stock",
    standing: "active",
  });

  stock1.save()
    .then((stockResult) => {
      if (!stockResult) {
        fail(res, 404, "Error not found newly added stock");
      }
      stock = Object.assign({}, stockResult);
      console.log(`\r\nstock is added ${stock}`);
      return success(res, 200, stockResult, "Done Initializing stock Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding stock ${err.message}`);
    });
}

// /////////////////////////////////////
// initCustomer
// ////////////////////////////////////

let customer = {
  nonce: 801167,
  username: "Jackie",
  wallet: "bez wallet",
  cart: [],
  wishlist: [],
  password: "6090juy778",
  photo: "default-customer-photo",
  profile: "8787",
  fullname: "Jackie Jone",
  address: "Cha Bo Soung",
  city: "Hong Song",
  zip: "5567",
  state: "Hong Kong",
  country: "China",
  phone: "097907689",
  email: "jones@hotdog.com",
  last_access: [
    {
      accessDate: "",
      ipAddress: "",
    },
  ],
  standing: "active",
  _id: "5b559b1932b93d35d00e5592",
  publicAddress: "0x1b19bfacc9fbcedd42deed4fe200beb039ecd1e0",
  currency: "5b559970dc79a83543dddb60",
  languageList: "5b5599d7ad92653576aa718b",
  gender: "m",
  updated: "2018-07-23T09:08:41.867Z",
  createdAt: "2018-07-23T09:08:41.942Z",
  updatedAt: "2018-07-23T09:08:41.942Z",
  __v: 0,
};
/*
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, required: true },
  }],
  wishlist: [{
    name: { type: String, unique: true, trim: true, max: 100, min: [2, "Too short name"] },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, required: true },
    }],
  }],
  */
export function initCustomer(req, res) {
  const customer1 = new Customer({
    access_token: "809iknhg67",
    publicAddress: "0x1B19BfaCc9FbcEDD42DEed4FE200BEb039eCd1E0",
    wallet: "bez wallet",
    username: "Jackie",
    language: "Chinese",
    currency,
    cart: [{ product: product._id, quantity: 10 }, { product: product._id, quantity: 7 }],
    wishlist: [{ name: "Xmas Shopping", products: [{ product, quantity: 10 }, { product, quantity: 7 }] },
      { name: "Rentree´ Scolair", products: [{ product, quantity: 10 }, { product, quantity: 7 }] }],
    languageList,
    gender: "m",
    password: "6090juy778",
    photo: "default-customer-photo",
    profile: "8787",
    fullname: "Jackie Jone",
    address: "Cha Bo Soung",
    city: "Hong Song",
    zip: 5567,
    state: "Hong Kong",
    country: "China",
    phone: "097907689",
    email: "jones@hotdog.com",
  });

  customer1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added customer");
      }
      customer = Object.assign({}, result);
      return success(res, 200, result, "Done Initializing customer Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding customer ${err.message}`);
    });
}


// /////////////////////////////////////
// initSubscriber
// ////////////////////////////////////

export function initSubscriber(req, res) {
  const subscriber1 = new Subscriber({
    email: customer.email,
    frequency: "weekly",
    interest: [product.name],
  });

  subscriber1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added subscriber");
      }
      return success(res, 200, result, "Done Initializing subscriber Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding subscriber ${err.message}`);
    });
}

// /////////////////////////////////////
// initCoupon
// ////////////////////////////////////

let coupon = {
  spec_array: [
    {
      season: "Xmas",
    },
    {
      condition: "Purchase of above 200",
    },
  ],
  standing: "active",
  _id: "5b55a7fc660bdd399ac16731",
  title: "Purchase Promo Coupon",
  code: "7yedygye767777",
  amount: 23.23,
  vendor: "5b54e618ae6b2a035fe83843",
  vendor_id: "5b54e618ae6b2a035fe83843",
  till: "2018-07-23T10:03:40.901Z",
  updated: "2018-07-23T10:03:40.905Z",
  createdAt: "2018-07-23T10:03:40.973Z",
  updatedAt: "2018-07-23T10:03:40.973Z",
  __v: 0,
};

export function initCoupon(req, res) {
  const coupon1 = new Coupon({
    title: "Purchase Promo Coupon",
    code: "7yedygye767777",
    amount: 23.2300,
    spec_array: [{ season: "Xmas" }, { condition: "Purchase of above 200" }],
    vendor,
    vendor_id: vendor._id,
    till: Date.now(),
  });

  coupon1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added coupon");
      }
      coupon = Object.assign({}, result);
      return success(res, 200, result, "Done Initializing coupon Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding coupon ${err.message}`);
    });
}

// /////////////////////////////////////
// initOrder
// ////////////////////////////////////

const order = {
  products: [
    "5b55979956bed531379b0aa3",
  ],
  standing: "active",
  _id: "5b55a85461383d3a1931dfc8",
  order_num: "87987",
  kind: "physical",
  vendor: "5b54e618ae6b2a035fe83843",
  vendor_id: "5b54e618ae6b2a035fe83843",
  customer: "5b559b1932b93d35d00e5592",
  payment: "payment details: btc by coinbase transfer today",
  shipment: "shipment details: DHL via American express",
  delivery: "delivery details: shipment recieved by customer at address",
  tracking_num: "iunsjsg878y",
  vat: 0.23,
  amount: 234.09,
  coupon: "5b55a7fc660bdd399ac16731",
  order_status: "delivered",
  zip: "5567",
  address: "Cha Bo Soung",
  city: "Hong Song",
  state: "Hong Kong",
  country: "China",
  phone: "097907689",
  email: "jones@hotdog.com",
  updated: "2018-07-23T10:05:08.292Z",
  createdAt: "2018-07-23T10:05:08.374Z",
  updatedAt: "2018-07-23T10:05:08.374Z",
  __v: 0,
};

export function initOrder(req, res) {
  const order1 = new Order({
    order_num: "87987",
    kind: "physical",
    vendor,
    vendor_id: vendor._id,
    customer,
    products: [product],
    payment: "payment details: btc by coinbase transfer today",
    shipment: "shipment details: DHL via American express",
    delivery: "delivery details: shipment recieved by customer at address",
    tracking_num: "iunsjsg878y",
    vat: 0.23,
    amount: 234.09000,
    coupon,
    order_status: "delivered",
    fullame: customer.fullame,
    zip: customer.zip,
    address: customer.address,
    street: customer.street,
    city: customer.city,
    state: customer.state,
    country: customer.country,
    phone: customer.phone,
    email: customer.email,
  });

  order1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added order");
      }
      return success(res, 200, result, "Done Initializing order Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding order ${err.message}`);
    });
}

// /////////////////////////////////////
// initBlog
// ////////////////////////////////////

let blog = {
  kind: "news",
  image: [
    "media-blog-image-1",
    "media-blog-image-3",
  ],
  view_count: 1,
  standing: "unpublished",
  _id: "5b55a8ffef05853b781e1371",
  title: "Lates Promo",
  summary: "Deal is a deal",
  vendor: "5b54e618ae6b2a035fe83843",
  content: "Tesla on promor. I one take two",
  tag: "cars,hybrid,toyota",
  updated: "2018-07-23T10:07:59.808Z",
  createdAt: "2018-07-23T10:07:59.883Z",
  updatedAt: "2018-07-23T10:07:59.883Z",
  __v: 0,
};

export function initBlog(req, res) {
  const blog1 = new Blog({
    kind: "news",
    title: "Lates Promo",
    summary: "Deal is a deal",
    vendor,
    vendor_id: vendor._id,
    content: "Tesla on promor. I one take two",
    tag: ["cars", "hybrid", "toyota"],
    image: ["media-blog-image-1", "media-blog-image-3"],
  });


  blog1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added blog");
      }
      blog = Object.assign({}, result);
      return success(res, 200, result, "Done Initializing blog Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding blog ${err.message}`);
    });
}

// /////////////////////////////////////
// initReview
// ////////////////////////////////////

export function initReview(req, res) {
  const review1 = new Review({
    customer,
    customer_id: customer._id,
    subject: "order",
    subject_id: order._id,
    vendor,
    vendor_id: vendor._id,
    comment: "This is a very good car",
    rating: "5",
  });

  review1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added review");
      }
      return success(res, 200, result, "Done Initializing review Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding review ${err.message}`);
    });
}

// /////////////////////////////////////
// initMedia
// ////////////////////////////////////

export function initMedia(req, res) {
  const media1 = new Media({
    media_type: "png",
    vendor,
    vendor_id: vendor._id,
    purpose: "banner",
    page: { product: false, stock: false, vendor: false, brand: true, category: false, blog: true },
    place: "bottom-left",
    num: "2",
    url: "default-media",
    title: "brand banner",
    description: "vendor brand banner",
    style: ".bg-white {background: #ffffff; text: #aa77ff; }",
  });

  media1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly added media");
      }
      return success(res, 200, result, "Done Initializing media Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding media ${err.message}`);
    });
}


// /////////////////////////////////////
// initTemplate
// ////////////////////////////////////

export function initTemplate(req, res) {
  const template1 = new Template({
    name: "theme1",
    page: "invoice",
    icon: "default-template-icon.png",
    style: ".bg-white {background: #ffffff; text: #aa77ff; }",
  });

  template1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly template media");
      }
      return success(res, 200, result, "Done Initializing template Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding template ${err.message}`);
    });
}

// /////////////////////////////////////
// initSlider
// ////////////////////////////////////

export function initSlider(req, res) {
  const slider1 = new Slider({
    name: "theme1",
    vendor_id: vendor._id,
    kind: "image",
    elements: ["media-1", "media-2"],
    page: "invoice",
    place: "top",
    title: "Slides of favorites on hotest sales",
    style: ".bg-white {background: #ffffff; text: #aa77ff; }",
  });

  slider1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly slider data");
      }
      return success(res, 200, result, "Done Initializing slider Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding slider ${err.message}`);
    });
}

// /////////////////////////////////////
// initMail
// ////////////////////////////////////

export function initMail(req, res) {
  const mail1 = new Mail({
    name: "welcome",
    language: "spanish",
    mail_subject: "welcome new vendors",
    mail_body: "Hello Vendor, you are welcome to Bezop",
  });

  mail1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly mail data");
      }
      return success(res, 200, result, "Done Initializing mail Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding mail ${err.message}`);
    });
}

// /////////////////////////////////////
// initMessage
// ////////////////////////////////////

export function initMessage(req, res) {
  const message1 = new Message({
    kind: "ticket",
    message_session: "98hytdrrghj",
    message_between: "customer_vendor",
    visitor_name: "Isaa Julius",
    visitor_email: "issah@julius.beg",
    subject: "Latest Toyota",
    message: "Promo discount included in coupon for cars?",
    customer_id: customer._id,
    vendor_id: vendor._id,
    sent_by: "customer",
  });

  message1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly message data");
      }
      return success(res, 200, result, "Done Initializing message Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding message ${err.message}`);
    });
}

// /////////////////////////////////////
// initTicket
// ////////////////////////////////////

export function initTicket(req, res) {
  const ticket1 = new Ticket({
    complainant: "customer",
    subject: "Latest Toyota",
    complain: "Promo discount included in coupon for cars?",
    customer,
    vendor,
  });

  ticket1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly ticket data");
      }
      return success(res, 200, result, "Done Initializing ticket Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding ticket ${err.message}`);
    });
}

// /////////////////////////////////////
// initSetting
// ////////////////////////////////////

export function initSetting(req, res) {
  const setting1 = new Setting({
    code: "mode",
    kind: "system",
    name: "stop_transactions",
    value: "01",
    description: "Stop  all transactions i.e. stocking, purchasing etc",
  });

  setting1.save()
    .then((result) => {
      if (!result) {
        fail(res, 404, "Error not found newly setting data");
      }
      return success(res, 200, result, "Done Initializing setting Data!");
    }).catch((err) => {
      fail(res, 500, `Error adding setting ${err.message}`);
    });
}
