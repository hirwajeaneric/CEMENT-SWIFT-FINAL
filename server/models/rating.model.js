const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    djId: { type: 'String', required: true },
    userId: { type: 'String', required: false },
    email: { type: 'String', required: true },
    fullName: { type: 'String', required: true },
    description: { type: String, required: false },
    score: { type: Number, required: true },
    ratingDate: { type: Date, required: true, default: Date.now() }
}) 

module.exports = mongoose.model('rating', ratingSchema);
