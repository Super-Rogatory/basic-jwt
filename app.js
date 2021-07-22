const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
})

app.listen(8080, () => console.log('currently listening on 8080'));
