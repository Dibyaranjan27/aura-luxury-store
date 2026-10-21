import mongoose from 'mongoose';
import Product from '../models/Product.js';

// @desc    Fetch all products with optional filters, search, and sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, isBestSeller } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (isBestSeller === 'true') {
      filter.isBestSeller = true;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ];
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    } else {
      // Default: featured / best sellers first
      query = query.sort({ isBestSeller: -1, createdAt: -1 });
    }

    const products = await query.exec();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product = null;
    if (mongoose.isValidObjectId(id)) {
      product = await Product.findById(id);
    }

    if (!product) {
      // Fallback check if searching by name or custom attribute
      product = await Product.findOne({
        $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { name: id }],
      });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch unique product categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.json(['All', ...categories]);
  } catch (error) {
    next(error);
  }
};
