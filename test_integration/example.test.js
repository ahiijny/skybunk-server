const process = require('process');

process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost/test-grapp-dev';
process.env.PORT = 3000;

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Example Test', () => {
  it('Big Shaq should be right', () => {
    chai.expect(2 + 2).to.equal(4);
    chai.expect(4 - 1).to.equal(3);
    // Quick maths!
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
