// Create a Post request (https://api.imgflip.com/caption_image) with only query params. Following are the params (copy username and password exactly as given below):
// template_id <meme_id>
// text0 <text you want as a caption>
// text1 <optional>
// username chewie12345
// password meme@123

// 4. Return a response with a body like this
// "data": {
//         "url": "https://i.imgflip.com/5mvxax.jpg",
//         "page_url": "https://imgflip.com/i/5mvxax"
//     }

//code is below

const axios = require('axios');

const getmeme = async (req, res) => {
    try {
        const {template_id} = req.query;
        const {text0} = req.query;
        const {text1} = req.query;
        const {username} = req.query;
        const {password} = req.query;

        const response = await axios.post(`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {getmeme}

// axios is a promise based http client for node.js and it is used to make api calls


// https://api.imgflip.com/get_memes

// 