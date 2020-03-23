const process = require('process');

process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost/test-grapp-dev';
process.env.PORT = 3000;

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('MongoDB', () => {
  it('should be connected', function (done) {
    this.timeout(10000); // sometimes it takes a while to start up
    // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
    if (mongoose.connection.readyState === 1) { // connected
      done();
    } else if (mongoose.connection.readyState === 0) { // disconnected
      done('Could not connect to MongoDB database');
    } else {
      // https://mongoosejs.com/docs/api/connection.html#connection_Connection-watch
      mongoose.connection.on('connected', () => done());
      mongoose.connection.on('disconnected', () => done('Could not connect to MongoDB database'));
    }
  });
});

describe('GET /', () => {
  it('should be a 404', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
