const express = require('express');
const app = express();
const config = require('config');
const bookRoute = require("./routes/bookRoute");
const mongoose = require("mongoose");


mongoose.connect(config.get('db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

app.use(express.json());
app.use(bookRoute);  

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
