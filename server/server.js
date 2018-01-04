const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//let price = [];
//let allCurrency = [];

const bonusList = JSON.parse(fs.readFileSync('bonusList.txt').toString());
console.log(bonusList);

app.use(express.static('client'));
app.use(bodyParser.text());

/*app.post('/cur', function(req, res) {
    price = req.body.split(' ');
    console.log(price);
} );*/

/*app.post('/allCurrency', function(req, res){
    allCurrency = JSON.parse(req.body);
    console.log(allCurrency);
})*/

app.get('/bonus', function(req, res) {

    res.send( {
        //price : +price[0],
        //values : allCurrency,
        //mainValue : price[1],
        bonusList : bonusList
        
    }  );
} );

const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});