const axios = require('axios');
const Coin = require('../model/coinModel');


exports.getCoins = async (req, res) => {

    try{
        const response = await axios.get('https://api.coincap.io/v2/assets'); // axios is used to fetch data from api 
        const coins = response.data.data.map(coin => {  // data.data 
            return {
                symbol: coin.symbol,
                name: coin.name,
                marketCapUsd: coin.marketCapUsd,
                priceUsd: coin.priceUsd,
                changePercent24Hr: coin.changePercent24Hr
            }
        });
        // const savedCoins = await Coin.insertMany(coins) 
        const savedCoins = await Coin.findOneAndUpdate(coins, { upsert: true });  //this line means that if coin is not present in database then insert it otherwise update it update 
        const sortedCoins = await Coin.find().sort({ changePercent24Hr: -1 }).limit(100);
        res.status(200).json({ status: true, message: 'coin data fetched successfully', count: sortedCoins.length, data: sortedCoins });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// in db we want to store coins in descending order of changePercent24Hr so 




