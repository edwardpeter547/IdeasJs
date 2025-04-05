const mongoose = require('mongoose');


const ideaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text field'],
    },
    tag: {
        type: String,
        required: [true, 'Please enter a tag']
    },
    username: {
        type: String,
        required: [true, 'You must provide a username']
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Idea', ideaSchema);