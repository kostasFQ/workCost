const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const zet = 'zet!';
let arr = [];

app.use(express.static('client'));

app.use(function(req, res, next){
    if (req.is('text/*')) {
      req.text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ req.text += chunk });
      req.on('end', next);
    } else {
      next();
    }
  });

app.get('/cur', function(req, res) {
    res.send(arr);
    res.end();
} );

app.post('/cur', function(req, res) {
    arr.push(req.text);
    console.log(arr);
} );


const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});