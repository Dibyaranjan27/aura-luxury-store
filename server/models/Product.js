import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  features: [{
    type: String
  }],
  // Flexible attributes for future expansion (like size, color, materials)
  attributes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
