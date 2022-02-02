const url2 = 'https://api.mercadolibre.com/items/';

const fetchItem = async (id) => {
  // seu código aqui
  try {
    const response = await fetch(`${url2}${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
