// Add item to local storage and update states
const addItemToCart = (product) => {
 let cartItems;
 if (localStorage.getItem('cartItems') === null) {
  cartItems = [];
 } else {
  cartItems = JSON.parse(localStorage.getItem('cartItems'));
 }

 //  Check if item exists and take its index
 let idx;
 if (cartItems.length !== 0) {
  cartItems.forEach((item, index) => {
   if (item._id == product._id) {
    idx = index;
   }
  });
 }

 if (idx !== undefined) {
  cartItems.splice(idx, 1, product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return cartItems;
 } else {
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return cartItems;
 }
};

// Remove item from local storage and updated states
const removeItemFromCart = (productId) => {
 //eslint-disable-line`
 if (window.confirm('Are you sure you want to delete this item from cart?')) {
  let cartItems;
  if (localStorage.getItem('cartItems') === null) {
   cartItems = [];
  } else {
   cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }

  cartItems.forEach((item, index) => {
   if (item._id === productId) {
    cartItems.splice(index, 1);
   }
  });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return cartItems;
 }
};

const cartServices = { addItemToCart, removeItemFromCart };
export default cartServices;
