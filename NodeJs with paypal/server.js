// import the required packages 
var express = require('express'); 
var path = require('path'); 
var app = express(); 
var paypal = require('paypal-rest-sdk');

var amount;

// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  //id'd has to be assigned after creating sandnox account in paypal.
  'client_id': 'AUoMPrZo5WLJHwarJKEAo2xApTQksEpPMaQtKyfq3UMc6WnvUVwnaHM9pTeoiCbAekVGUZjTnsIz65xW', // please provide your client id here 
  'client_secret': 'EFF-wpNVypX6UD58Bf_jGr4Q8Hg_RUiZxqxDXpd9DQc2Z1zyStr5bk9ggHPU_QRSu7ot_3PD90ntit98' // provide your client secret here 
});

// redirect to store when user hits http://localhost:3000
app.get('/' , (req , res) => {
    // res.redirect('/index.html');
    res.sendFile("index.html",{root:__dirname}); 
})

// start payment process 
app.get('/buy' , ( req , res ) => {
    
    // create payment object
    amount=req.query.amount;
    
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/err"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "This is the payment description."
        }]
    };
	
    console.log("amount in get "+req.query.amount);
    
	// call the create Pay method 
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            for(let i=0;i<payment.links.length;i++)
            {
                if(payment.links[i].rel==='approval_url')
                    res.redirect(payment.links[i].href);
            }
        }
    });

}); 


// success page 
app.get('/success' , (req ,res ) => {
    const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  console.log("res "+res.query);
  console.log("req "+req.query);
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total":amount
        }
    }]
};


paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.sendFile("success.html",{root:__dirname});
    }
});

});

// error page 
app.get('/err' , (req , res) => {
    console.log(req.query);
    res.sendFile("err.html",{root:__dirname}); 
})

// app listens on 3000 port 
app.listen( 3000 , () => {
    console.log(' app listening on 3000 '); 
})
