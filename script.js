function soma() {
  const tag = document.querySelector('.total-price');
  const produtos = document.querySelectorAll('.cart__item');
  let somaTotal = 0;
  produtos.forEach((index) => {
    const string = index.innerText.split(' ');
    const somando = string[string.length - 1];
    const valor = somando.replace(/[$]/, '');
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  soma();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

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

const cart = document.querySelector('.cart__items');
const carrinho = async (e) => {
  const teste = e.target.parentNode.firstChild.innerText;
  const api2 = await fetchItem(teste);
  const { id, title, price } = api2;
  const obj = {
    sku: id,
    name: title,
    salePrice: price,
  };
  console.log(obj);
  cart.appendChild(createCartItemElement(obj));
  soma();
};

const test = document.querySelector('body');
test.addEventListener('click', (e) => {
  if (e.target.classList.contains('item__add')) {
    e.preventDefault();
    carrinho(e);
  }
});

const apagaCarrinho = () => {
const carrinhoItens = document.querySelector('.cart__items');
  carrinhoItens.innerHTML = '';
  soma();
};

window.onload = async () => { 
  const container = document.querySelector('.container');
  const carregando = document.createElement('p');
  carregando.innerHTML = 'carregando...';
  carregando.className = 'loading';
  container.appendChild(carregando);
  await products('computador');
  carregando.remove();
  const botaoApaga = document.querySelector('.empty-cart');
  botaoApaga.addEventListener('click', apagaCarrinho);
};
