#!/usr/bin/env node
'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Grab inputs
var contrib = 0.0;
var numMonths = 0;
var fmv = 0.0;
var rl = _readline2.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});

var main = function main() {
    var uri = "http://free.currencyconverterapi.com/api/v5/convert";
    var queries = {
        q: 'USD_INR',
        compact: 'y'
    };
    (0, _request2.default)({ url: uri, qs: queries }, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
        var res = JSON.parse(response.body);
        rl.question('Enter your ESPP Contribution per Month\n', function (ans) {
            contrib = parseFloat(ans);
            rl.question('Enter number of Months\n', function (ans) {
                numMonths = parseInt(ans);
                rl.question('Enter your Offering Price $\n', function (ans) {
                    fmv = parseFloat(ans);
                    var currentUSDToINR = parseFloat(res.USD_INR.val);
                    var amountInUSD = numMonths * contrib / currentUSDToINR;
                    var numOfShares = amountInUSD / fmv;
                    numOfShares = Math.round(numOfShares);
                    console.log('\nAllocated No. of Shares ' + numOfShares);
                    rl.close();
                });
            });
        });
    });
};
main();
