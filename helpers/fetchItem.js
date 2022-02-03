const url2 = 'https://api.mercadolibre.com/items/';

const fetchItem = async (id) => {
  // seu código aqui
  if (id === undefined || id.endsWith('undefined')) {
    return new Error('You must provide an url');
  }
  const response = await fetch(`${url2}${id}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
