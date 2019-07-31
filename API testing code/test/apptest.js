

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app'); 
// GET - List all colors

describe('get and post colors.', function() {
  it('should return all colors', function() {
    return chai.request(app)
      .get('/colors')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array');
      });
  });

  // POST - Add new color
  it('should add new color', function() {
    return chai.request(app)
      .post('/colors')
      .send({
        color: 'PURPLE'
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.results).to.be.an('array').that.includes(
          'PURPLE');
      });
  });
});
