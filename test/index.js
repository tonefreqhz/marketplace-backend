// During the test the env variable is set to test
process.env.NODE_ENV = "test";
process.env.DB_HOST = process.env.DB_HOST_TEST;

// Require the dev-dependencies

import chai from "chai"
import chaiHttp from "chai-http"
import http from "http";
import assert from "assert";
import dotenv from "dotenv"
import note from "../app/models/note.model"
import app from "../lib/server"

dotenv.config()

let should = chai.should();
let expect = chai.expect;

const PORT = process.env.PORT  
const URL = `http://localhost:${PORT}/api/v1`

chai.use(chaiHttp);


it("fails, as expected", function(done) { // <= Pass in done callback
    chai.request(URL)
    .get("/")
    .end(function(err, res) {
      expect(res).to.have.status(404);
      done();                               // <= Call done to signal callback end
    });
  });
   
  it("succeeds silently!", function() {   // <= No done callback
    chai.request(URL)
    .get("/")
    .end(function(err, res) {
      expect(res).to.have.status(123);    // <= Test completes before this runs
    });
  });

  it("GET /notes request", function() {  
    chai.request(URL+"/notes")
    .get("/notes")
    .end(function(err, res) {
      expect(res).to.have.status(123)
    });
  });

