const chai = require('chai');
const expect = require('chai').expect;

const app = require('../index'); 

// Get single user
describe('get single user and all users', function() {

  it('should return info regarding single user', function() {
    return chai.request(app)
      .get('/user')
        .expect(res).to.have.status(200)
        .expect(res).to.be.json
        .expect(res.body).to.be.an('object');
      
  });

  // Get all users
  it('should return all users info', function() {
    return chai.request(app)
      .get('/allusers')
        .expect(res).to.have.status(200)
        .expect(res).to.be.json
        .expect(res.body).to.be.an('object');
      
  });

});
