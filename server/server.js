const express = require('express');
const jwt = require ('jsonwebtoken')
const mongoose = require('mongoose');
const cors = require ('cors');

const routes = require('./routes/routes')
const adminRoutes = require("./routes/adminRoutes")
require('dotenv').config({ path: '.env' });


const app = express();
app.use(cors());


mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connected to MongodB")
}).catch(error => {
    console.log("Error connecting to database" + error);
});

mongoose.connection.on('error', err => {
    console.log(err);
});

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, function () {
    console.log('Server running on PORT ' + process.env.PORT);
})