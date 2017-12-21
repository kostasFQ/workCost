const express = require('express');

const app = express();

app.use(express.static('client'));

app.get('/cur');


const server = app.listen(process.env.PORT || 8000, function() {
    console.log('Server running on port 8000.')
});