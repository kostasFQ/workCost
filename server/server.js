const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let price = [];
let allCurrency = [];


app.use(express.static('client'));
app.use(bodyParser.text());

app.post('/cur', function(req, res) {
    price = req.body.split(' ');
    console.log(price);
} );

app.post('/allCurrency', function(req, res){
    allCurrency = JSON.parse(req.body);
    console.log(allCurrency);
})

app.get('/cur', function(req, res) {
    let day = +price[0]/21;
    let hour = day/8;
    let min = hour/60;
    let sec = +(min/60).toFixed(5);

    let uah = allCurrency[0];
    let usd = allCurrency[1];
    let eur = allCurrency[2];
    let rub = allCurrency[3];
    let byn = 1;


    res.send( {
        price : price[0],
        values : {
            "UAH" : uah,
            "USD" : usd,
            "EUR" : eur,
            "RUB" : rub,
            "BYN" : byn

        },
        mainValue : price[1]
        
    }  );
} );

const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});