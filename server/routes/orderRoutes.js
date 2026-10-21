import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);

export default router;
