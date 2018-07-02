//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.DB_HOST = process.env.DB_HOST_TEST;

//import mongoose from "mongoose"
import note from '../app/models/note.model'

//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../lib/server'

const PORT = process.env.PORT  

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('notes', () => {
    beforeEach((done) => { 
        //Before each test we empty the database
        note.remove({}, (err) => { 
           done();         
        });     
    });
/*
* Test the /GET route


  describe('/GET note', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get(`http://localhost:${PORT}/api/v1/notes`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  */

});