require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se a função fetchProducts realmente é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Executando fetchProducts com "computador", fetch tem que ser chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Executando fetchProducts com "computador", fetch tem que ser chamada com o endpoint passado', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const funcao = await fetchProducts('computador');
    expect(funcao).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const funcao = await fetchProducts();
    expect(funcao).toEqual(new Error('You must provide an url'));
  });
});
