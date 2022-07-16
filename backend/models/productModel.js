import mongoose from 'mongoose';
import { timestamp } from 'rxjs';

// Set review schema
const reviewSchema = mongoose.Schema({
 comment: {
  type: String,
  required: true,
 },
 rating: {
  type: Number,
  require: true,
 },
 name: {
  type: String,
  required: true,
 },
}
{
  timestamps: true,
}
);


// Set product schema
const productSchema = mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User',
 },
 price: {
  type: Number,
  required: true,
 },
 name: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 image: {
  type: String,
  required: true,
 },
 brand: {
  type: String,
  required: true,
 },
 category: {
  type: String,
  required: true,
 },
 countInStock: {
  type: Number,
  required: true,
 },
 rating: {
  type: Number,
  required: true,
  default: 0,
 },
 numReviews: {
  type: Number,
  required: true,
  default: 0,
 },
 reviews: [reviewSchema],
});

const Product = mongoose.Model('Product', productSchema);

export default Product;
