import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: 'guest',
    },
    userEmail: {
      type: String,
      default: '',
    },
    shippingAddress: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      postal: { type: String },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        name: { type: String },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
        image: { type: String },
        variant: {
          type: mongoose.Schema.Types.Mixed,
          default: null,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Paid',
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
