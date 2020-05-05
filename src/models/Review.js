const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  stars: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
