#!/usr/bin/env node
//Grab inputs
import request from 'request';
import readline from 'readline';
let contrib = 0.0;
let numMonths = 0;
let fmv = 0.0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});


const main = () => {
    var uri = "http://free.currencyconverterapi.com/api/v5/convert";
    var queries = {
        q: 'USD_INR',
        compact: 'y'
    }
    request({ url: uri, qs: queries }, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
        var res = JSON.parse(response.body);
        rl.question('Enter your ESPP Contribution per Month\n', (ans) => {
            contrib = parseFloat(ans);
            rl.question('Enter number of Months\n', (ans) => {
                numMonths = parseInt(ans);
                rl.question('Enter your Offering Price $\n', (ans) => {
                    fmv = parseFloat(ans);
                    var currentUSDToINR = parseFloat(res.USD_INR.val);
                    var amountInUSD = (numMonths * contrib) / currentUSDToINR
                    var numOfShares = amountInUSD / fmv;
                    numOfShares = Math.round(numOfShares);
                    console.log(`\nAllocated No. of Shares ${numOfShares}`);
                    rl.close();
                });
            });
        });
    });
}
main();
