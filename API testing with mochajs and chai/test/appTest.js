const assert =require('chai').assert;
const sayHello=require('../app').sayHello;
const addNumbers=require('../app').addNumbers;

describe('App',function(){
    describe('sayHello()',function(){
        it('sayHello should return hello',function(){
            let result=sayHello();
            assert.equal(result,'hello');
        });
    
        it('sayHello should return type string',function(){
            let result=sayHello();
            assert.typeOf(result,'string');
        });
    });

    describe('addNumbers()',function(){
        it('add numbers should be above 5',function(){
            let result=addNumbers(5,5);
            assert.isAbove(result,5);
        });

        it('add numbers should return type numbers',function(){
            let result=addNumbers(5,5);
            assert.typeOf(result,'number');
        });
    });

    
});
