const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let price = [];
let allCurrency = [];

let bonusList = [
    {
        id : 'hamburger',
        bonusName : 'Гамбургер',
        bonusCost : 1.7
    },
    {
        id : 'coffee',
        bonusName : 'Капуччино',
        bonusCost : 2.5
    },
    {
        id : 'tickets',
        bonusName : 'талон на проезд',
        bonusCost : 0.5
    }
];


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


    res.send( {
        price : price[0],
        values : [allCurrency[0], allCurrency[1], allCurrency[2], allCurrency[3], {scale :  1, name : "Белорусский рубль", rate : 1.0000, abbreviation : "BYN"}],
        mainValue : price[1],
        bonusList : bonusList
        
    }  );
} );

const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});