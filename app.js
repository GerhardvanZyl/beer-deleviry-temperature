const express = require('express');
const app = express();

const truckController = require('./controllers/truck-controller');

const port = 3000;

const listener = app.listen(port, ()=>{
    console.log(`listening on http://localhost:${listener.address().port}`);
});

// routes
app.use(express.static('wwwroot'));
app.get('/api/truck/content', truckController.getContent);
