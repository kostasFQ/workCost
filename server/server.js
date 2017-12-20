const express = require('express');

const app = express();

app.use(express.static('client'));

const server = app.listen(process.env.PORT || 1213, () => {
    console.log('Server running on port 1213.')
});