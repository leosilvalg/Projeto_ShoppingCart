const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async (type) => {
  // seu código aqui
  try {
    const response = await fetch(`${url}${type}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
  // const { results: sku, results: name, results: image } = data;
  // return {
  //   sku,
  //   name,
  //   image,
  // };
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
