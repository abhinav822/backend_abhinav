// Write a POST api that creates a publisher from the details in the request body
const newPublisherSchema = require("../models/newPublisherSchema.js")

exports.createPublisher = async function (req, res) {
    try {
        let publisher = req.body
        let publisherCreated = await newPublisherSchema.create(publisher)
        res.send({data: publisherCreated})
    } catch (error) {
        res.send({error: error.message})
    }
}





