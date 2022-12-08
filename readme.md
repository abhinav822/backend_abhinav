
Now the assignment is to create an API that does the following ( one single API and not multiple separate API’s)

Get the list of all the top 100 cryptocurrency coins in the world using the /assets api ( the first api mentioned in the documentation)
Save all the 100 coins in database ( each document to have data of 1 coin)
The schema should have the following 4 keys:
 {  "symbol" // String and Unique
    "name": // String and Unique
    "marketCapUsd": // String  ( not Number)
     "priceUsd": //String
   }
Notice that changePercent24Hr key is not present in the schema or collection

Send back the list of all the coins sorted in order of their growth in last 24 hours   i.e. sort all the 100 coins based on their changePercent24Hr and send the sorted array in response

The above has to be done in one single API and not multiple separate API’s. SO go step by step and build features into your API one by one.

NOTE: When you hit the api for the first time, it will create 100 documents corresponding to the 100 coins in your database. Now next time when you hit your API, it will fail as you have made the symbol and name unique in your schema. Same coins can't be saved again as they will have the same symbol and name. SO you could do one of these 3 things to help yourself in the development phase:
- delete the data from DB every time after hitting your API 
- Don't maintain “unique:true” in your schema till you are done with your development and add unique:true only towards the completion of your assignment
- for inserting the documents, use findOneAndUpdate with upsert=true..this will create a new document in case there is no entry or will update the old doc with new values when there is an entry already there

// steps to make this work using mvc pattern is as follows:

// 1. create a model for the coin then inside the model create a schema for the coin like this:

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    marketCapUsd: {
        type: String,
        required: true
    },
    priceUsd: {
        type: String,
        required: true
    }
});




// but i have to create one single api and not multiple separate api’s so i have to create one single api as follows:

const Coin = require('../models/coin.model');

const getCoins = async (req, res) => {
    try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const coins = response.data.data;  // why data.data? because the data is in the form of {data: []} and we need the array of objects inside the data key
        const savedCoins = await Coin.insertMany(coins);
        const sortedCoins = await Coin.find().sort({ changePercent24Hr: -1 });
        res.status(200).json(sortedCoins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// to hit the api in postman i have to make get request to http://localhost:5000/coins

    "message": "E11000 duplicate key error collection: test.coins index: symbol_1 dup key: { symbol: \"BTC\" }" if i have to insert the same coin again and again in the database so i have to make the symbol and name unique in the schema but they are already unique so another way to do this is to use findOneAndUpdate with upsert=true so that it will create a new document in case there is no entry or will update the old doc with new values when there is an entry already there

    so i can use findOneAndUpdate with upsert=true instead of insertMany as follows:

    const savedCoins = await Coin.insertMany(coins);
    const savedCoins = await Coin.findOneAndUpdate(coins, coins, { upsert: true });

    so updated code is as follows:

    const Coin = require('../models/coin.model');

    const getCoins = async (req, res) => {
        try {
            const response = await axios.get('https://api.coincap.io/v2/assets');
            const coins = response.data.data;  // why data.data? because the data is in the form of {data: []} and we need the array of objects inside the data key
            const savedCoins = await Coin.findOneAndUpdate(coins, coins, { upsert: true });
            const sortedCoins = await Coin.find().sort({ changePercent24Hr: -1 });
            res.status(200).json(sortedCoins);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    


