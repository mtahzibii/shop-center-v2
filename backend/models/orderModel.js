import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
 {
  user: {
   type: mongoose.Schema.Types.ObjectId,
   required: true,
   ref: 'User',
  },
  orderItems: [
   {
    qty: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
     type: mongoose.Schema.Types.ObjectId,
     require: true,
     ref: 'Product',
    },
   },
  ],
  totalPrice: {
   type: Number,
   required: true,
   default: 0.0,
  },
  taxPrice: {
   type: Number,
   required: true,
   default: 0.0,
  },
  shippingPrice: {
   type: Number,
   required: true,
   default: 0.0,
  },
  paymentMethod: {
   type: String,
   required: true,
  },
  paymentResult: {
   id: { type: String },
   status: { type: String },
   update_time: { type: String },
   email_address: { type: String },
  },
  isPaid: {
   type: Boolean,
   required: true,
   default: false,
  },
  paidAt: {
   type: Date,
  },
  isDelivered: {
   type: Boolean,
   required: true,
   default: false,
  },
  deliveredAt: {
   type: Date,
  },
 },
 {
  timestamps: true,
 }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
