const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let cors = require('cors');

let price = [];

app.use(express.static('client'));
app.use(bodyParser.text());

app.post('/cur', function(req, res) {
    price = req.body.split(' ');
    console.log(price);
} );

app.get('/cur', function(req, res) {
    let day = (+price[0]/21).toFixed(2);
    let hour = (day/8).toFixed(2);
    let min = (hour/60).toFixed(2);
    let sec = (min/60).toFixed(5);
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