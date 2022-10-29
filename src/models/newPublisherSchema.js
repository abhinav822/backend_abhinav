

const mongoose = require('mongoose');

// A newPublisher document should look like this.
// {
// 		_id: ObjectId("61951bfa4d9fe0d34da86344"),
// name: “Penguin”,
// headQuarter: “New Delhi”,
// }

const publisherSchema = new mongoose.Schema( {
    //id is referenced in the bookSchema so you don't need to add it here
    name: String,
    headquarter: String
});

module.exports = mongoose.model('newPublisher', publisherSchema)
