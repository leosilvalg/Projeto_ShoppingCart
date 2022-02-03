const itemNoCarrinho = document.querySelector('.cart__items');
const botaoApaga = document.querySelector('.empty-cart');
const test = document.querySelector('body');

// Função para somar os valores dos itens

function soma() {
  const tag = document.querySelector('.total-price');
  const produtos = document.querySelectorAll('.cart__item');
  let somaTotal = 0;
  produtos.forEach((index) => {
    const string = index.innerText.split(' ');
    const somando = string[string.length - 1];
    const valor = somando.replace('$', '');
    const converte = Number(valor);
    somaTotal += converte;
  });
  tag.innerText = `${somaTotal}`;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img; // commit inicial
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  // console.log(section);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Função para remover os itens do carrinho pelo click, alem de atualizar o localStorage e também a soma

function cartItemClickListener(event) {
  event.target.remove();
  localStorage.setItem('cartItems', itemNoCarrinho.innerHTML);
  soma();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função assincrona para carregar os itens da API no body no HTML 

async function products(param) {
  const section = document.querySelector('.items');
  const api = await fetchProducts(param);
  // console.log(api);
  await api.results.forEach((index) => {
    const objeto = { sku: index.id, name: index.title, image: index.thumbnail };
    // console.log(objeto);
    const item = createProductItemElement(objeto);
    section.appendChild(item);
  });
}

// Função para adicionar os itens clicados ao carrinho, além de salvar os mesmos no localStorage e realizar a soma dos mesmos 

const carrinho = async (e) => {
  const teste = e.target.parentNode.firstChild.innerText;
  console.log(teste);
  const api2 = await fetchItem(teste);
  const { id, title, price } = api2;
  const obj = {
    sku: id,
    name: title,
    salePrice: price,
  };
  // console.log(obj);
  itemNoCarrinho.appendChild(createCartItemElement(obj));
  localStorage.setItem('cartItems', itemNoCarrinho.innerHTML);
  soma();
};

// Função que vai chamar a anterior com base no click, as duas são dependentes

test.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    carrinho(e);
  }
});

// Funçao par ativar o botão de limpar o carrinho, alem de atualizar a soma e o localStorage

const apagaCarrinho = () => {
  itemNoCarrinho.innerHTML = '';
  soma();
  localStorage.setItem('cartItems', itemNoCarrinho.innerHTML);
};

botaoApaga.addEventListener('click', apagaCarrinho);

// Funções e operaçoes realizadas no carregamento da página. Criação do loading, carregamento dos itens no body, remoção do loading, carregamento do localStorage(com a possibilidade de excluir os itens pelo click após o carregamento), alem de mater a soma na atualização;

window.onload = async () => { 
  const container = document.querySelector('.container');
  const carregando = document.createElement('p');
  carregando.innerHTML = 'carregando...';
  carregando.className = 'loading';
  container.appendChild(carregando);
  await products('computador');
  carregando.remove();
  itemNoCarrinho.innerHTML = localStorage.getItem('cartItems');
  itemNoCarrinho.addEventListener('click', cartItemClickListener);
  soma();
};
