const saveCartItems = (items) => {
  // seu código aqui
  
  localStorage.setItem('cartItems', items);
};

saveCartItems();

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
