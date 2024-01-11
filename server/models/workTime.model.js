const mongoose = require('mongoose');

const workTimeSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: false
    },
    listOfDjs: {
        type: Array,
        required: false,
    }
}); 

module.exports = mongoose.model('work_time', workTimeSchema);