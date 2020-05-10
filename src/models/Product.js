const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  onSale: {
    type: Boolean,
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
  productImage: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
