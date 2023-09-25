const express = require('express');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes')
require('dotenv').config({ path: '.env' });


mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connected to MongodB")
}).catch(error => {
    console.log("Error connecting to database" + error);
});

mongoose.connection.on('error', err => {
    console.log(err);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)

app.listen(process.env.PORT, function () {
    console.log('Server running on PORT ' + process.env.PORT);
})