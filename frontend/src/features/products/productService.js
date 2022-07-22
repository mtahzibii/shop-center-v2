import axios from 'axios';
const API_URL = 'http://localhost:5000/api/products';

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

const productService = { getProducts, getProduct };
export default productService;
