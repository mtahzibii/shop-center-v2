import axios from 'axios';
const API_URL = '/api/products';

// Get all products from API
const getProducts = async () => {
 const { data } = await axios.get(API_URL);
 return data;
};

// Get single product
const getProduct = async (productId) => {
 const { data } = await axios.get(`${API_URL}/${productId}`);
 return data;
};

// Update product
const updateProductSpec = async (productData, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };

 const { data } = await axios.put(
  `${API_URL}/admin/products/${productData._id}`,
  productData,
  config
 );

 return data;
};

// Create new product
const createNewProduct = async (productData, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };

 const { data } = await axios.post(`${API_URL}/admin/products`, productData, config);
 return data;
};

// Delete a product
const deleteSingleProduct = async (productId, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };

 const { data } = await axios.delete(
  `${API_URL}/admin/products/${productId}`,
  config
 );

 return data;
};

// Search product(s) service
const searchProductsByUsers = async (keyword) => {
 const { data } = await axios.get(`${API_URL}/search/${keyword}`);

 return data;
};

// Create product review
const createProductReview = async (review, token) => {
 const config = {
  headers: {
   Authorization: `Bearer ${token}`,
  },
 };
 const { data } = await axios.post(
  `${API_URL}/${review.productId}/reviews`,
  review,
  config
 );

 console.log(data);

 return data;
};

const productService = {
 getProducts,
 getProduct,
 updateProductSpec,
 createNewProduct,
 deleteSingleProduct,
 searchProductsByUsers,
 createProductReview,
};
export default productService;
