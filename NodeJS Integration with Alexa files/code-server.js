const https = require('https');
const express = require('express');
const bodyParser = require('body-parser')
var app = new express();
app.use(bodyParser.json());

//    Variables Declaration
var payload;
var output;
var whResponse = {};
var replies = [];
var repliesContent = {};
var entity;
var options = {
    host: 'api10.successfactors.com',
    port: 443,
    path: '',
    headers: {
        //Authorization: 'Basic U0ZBRE1JTkBpbmZvc3lzbGltRDpJbmZvc3lzMTIz'
        Authorization: 'Basic QVBJVVNFUkBpbmZvc3lzbGltRDpUcmlkZW50QDE=' //APIUSER@infosyslimD
    }
};

//var url = 'https://api10.successfactors.com/odata/v2/EmpTimeAccountBalance?$filter=userId%20eq%20%2710010%27%20and%20timeAccountType%20eq%20%27US_TA_SickLeave%27&$format=json';

app.use('/', function(request, response) {
    var slbalance;
    var vlbalance;
    replies = [];
    repliesContent.type = 'text';
    payload = request.body;
    
    //console.log(request);
    console.log(payload.nlp.entities.sickleave)
    //console.log(payload.memory);
    
    console.log('printing entities');
    
    for(var a in payload.nlp.entities)
    {
        if(a==='sickleave'||a==='vacationleave' || a === 'totalleave' || a === 'myleaves')
            break;
    }
    
    if (a === 'sickleave') {
        options.path = '/odata/v2/EmpTimeAccountBalance?$filter=userId%20eq%20%2710010%27%20and%20timeAccountType%20eq%20%27US_TA_SickLeave%27&$format=json';
        https.get(options, (res) => {
            var result;
            //console.log('inside sick leave 12');
            res.on('data', (chunk) => {
                if (result !== undefined) {
                    result += chunk.toString();
                } else {
                    result = chunk.toString();
                }
            });
            res.on('end', () => {
                console.log('inside sick leave 2');
                output = JSON.parse(result).d.results[0].balance;
                console.log(output);
                repliesContent.content = "Your Sick Leave balance is " + output;
                replies.push(repliesContent);
                whResponse.replies = replies;
                response.send(whResponse);
            });

            res.on('error', (e) => {
                error(response ,(e));
            });
        });
    } else if (a === 'vacationleave') {
        options.path = '/odata/v2/EmpTimeAccountBalance?$filter=userId%20eq%20%2710010%27%20and%20timeAccountType%20eq%20%27US_TA_Vacation%27&$format=json';
        https.get(options, (res) => {
            var result;
            res.on('data', (chunk) => {
                if (result !== undefined) {
                    result += chunk.toString();
                } else {
                    result = chunk.toString();
                }
            });
            res.on('end', () => {
                console.log(result);
                output = JSON.parse(result).d.results[0].balance;
                console.log(output);
                repliesContent.content = "Your Vacation Leave balance is " + output;
                console.log(repliesContent.content);
                replies.push(repliesContent);
                whResponse.replies = replies;
                response.send(whResponse);
            });

            res.on('error', (e) => {
                error(response ,(e));
            });
        });
    } else if (a === 'totalleave' || a === 'myleaves') {
        options.path = '/odata/v2/EmpTimeAccountBalance?$filter=userId%20eq%20%2710010%27%20and%20timeAccountType%20eq%20%27US_TA_SickLeave%27&$format=json';
        https.get(options, (res) => {
            var result;
            res.on('data', (chunk) => {
                if (result !== undefined) {
                    result += chunk.toString();
                } else {
                    result = chunk.toString();
                }
            });
            res.on('end', () => {
                slBalance = JSON.parse(result).d.results[0].balance;
                console.log(slBalance);
                options.path = '/odata/v2/EmpTimeAccountBalance?$filter=userId%20eq%20%2710010%27%20and%20timeAccountType%20eq%20%27US_TA_Vacation%27&$format=json';
                https.get(options, (res) => {
                    var result;
                    res.on('data', (chunk) => {
                        if (result !== undefined) {
                            result += chunk.toString();
                        } else {
                            result = chunk.toString();
                        }
                    });
                    res.on('end', () => {
                        vlBalance = JSON.parse(result).d.results[0].balance;
                        console.log(vlBalance);
                        output = parseFloat(slBalance) + parseFloat(vlBalance);
                        console.log(output);
                        repliesContent.content = "Your Total Leave balance is " + output;
                        replies.push(repliesContent);
                        whResponse.replies = replies;
                        response.send(whResponse);
                    });

                    res.on('error', (e) => {
                        error(response ,(e));
                    });
                });

            });

            res.on('error', (e) => {
                error(response ,(e));
            });
        });
    }
    
});

function error(response,(e)=>{
        console.error(e);
        output = e.message;
        repliesContent.content = "Error: " + output;
        replies.push(repliesContent);
        whResponse.replies = replies;
        response.send(whResponse);
    })

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('SF NodeApp listening on port ' + port);
});
