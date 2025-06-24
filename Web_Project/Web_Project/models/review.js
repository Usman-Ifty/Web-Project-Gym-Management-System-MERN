const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);