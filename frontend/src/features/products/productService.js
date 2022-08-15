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

 console.log(data);

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

 console.log(data);

 return data;
};

const productService = {
 getProducts,
 getProduct,
 updateProductSpec,
 createNewProduct,
};
export default productService;
