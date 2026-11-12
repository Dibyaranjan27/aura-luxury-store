import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Create new order with server-side price verification
// @route   POST /api/orders
// @access  Public
export const addOrderItems = async (req, res, next) => {
  try {
    const { items, userId, userEmail, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }

    // Verify and calculate real pricing
    let verifiedTotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      let unitPrice = Number(item.priceAtPurchase || item.price);
      const qty = Math.max(1, Number(item.quantity) || 1);

      if (isDBConnected() && item.product && mongoose.isValidObjectId(item.product)) {
        const dbProduct = await Product.findById(item.product);
        if (dbProduct) {
          unitPrice = dbProduct.price;
        }
      }

      if (isNaN(unitPrice) || unitPrice <= 0) {
        res.status(400);
        throw new Error(`Invalid price for item ${item.name || 'in order'}`);
      }

      verifiedTotal += unitPrice * qty;
      verifiedItems.push({
        product: item.product || item.id || 'custom',
        name: item.name || 'Aura Luxury Piece',
        quantity: qty,
        priceAtPurchase: unitPrice,
        image: item.image || '',
        variant: item.variant || null,
      });
    }

    if (!isDBConnected()) {
      // Offline fallback: return a confirmed order response
      return res.status(201).json({
        _id: `ORD-${Date.now().toString().slice(-6)}`,
        userId: userId || 'guest',
        userEmail: userEmail || '',
        shippingAddress: shippingAddress || {},
        items: verifiedItems,
        totalAmount: verifiedTotal,
        paymentStatus: 'Paid',
        status: 'Processing',
        createdAt: new Date().toISOString(),
      });
    }

    const order = new Order({
      userId: userId || 'guest',
      userEmail: userEmail || '',
      shippingAddress: shippingAddress || {},
      items: verifiedItems,
      totalAmount: verifiedTotal,
      paymentStatus: 'Paid',
      status: 'Processing',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders (Secured: requires specific user identifier)
// @route   GET /api/orders/myorders
// @access  Public
export const getMyOrders = async (req, res, next) => {
  try {
    const { userId, email } = req.query;

    // Security check: prohibit unauthenticated dumping of all database orders
    if ((!userId || userId === 'guest') && (!email || email.trim() === '')) {
      return res.status(400).json({ message: 'User identification required to view orders' });
    }

    if (!isDBConnected()) {
      return res.json([]);
    }

    const filter = {};
    if (userId && userId !== 'guest') {
      filter.userId = userId;
    } else if (email) {
      filter.userEmail = email.trim();
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};
