const mongoose = require('mongoose');

const workTimeSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: false
    },
    listOfProducts: {
        type: Array,
        required: false,
    }
}); 

module.exports = mongoose.model('work_time', workTimeSchema);