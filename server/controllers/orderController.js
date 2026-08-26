import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Needs auth middleware later)
export const addOrderItems = async (req, res, next) => {
  try {
    const { items, totalAmount } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        userId: 'temp_user_id', // TODO: replace with req.user._id from auth middleware
        items,
        totalAmount
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};
