const express = require('express');
const app = express();

const truckController = require('./controllers/truck-controller');

const port = 3000;

app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
});

// routes
app.get('/truck/content', truckController.getContent);
