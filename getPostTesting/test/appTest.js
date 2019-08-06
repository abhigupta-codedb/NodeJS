var request =require('supertest');
var app=require('../index')

describe("homepage",function(){
    it("welcomes the user",function(done){
        request(app).get("/")
        .expect(200)
        .expect("hello user",done)
        });
    });
describe("contact form",function(){
    it("thanks the user after they fill out the contact form",function(){
        request(app).post("/contact")
        .send({name:"jeff"})
        .expect(302)
        .expect('Location',"thank-you",function(){
            request(app).get('/thank-you')
            .expect(200)
            .expect('thank you',done)
        })
    });
});
