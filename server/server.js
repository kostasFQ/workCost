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
    res.send( {
        day : day,
        hour : hour,
        min : min,
        sec : sec,
    }  );
} );

const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});