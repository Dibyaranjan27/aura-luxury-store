import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const addOrderItems = async (req, res, next) => {
  try {
    const { items, totalAmount, userId, userEmail, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }

    const order = new Order({
      userId: userId || 'guest',
      userEmail: userEmail || '',
      shippingAddress: shippingAddress || {},
      items,
      totalAmount,
      paymentStatus: 'Paid',
      status: 'Processing',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Public
export const getMyOrders = async (req, res, next) => {
  try {
    const { userId, email } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (email) filter.userEmail = email;

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
