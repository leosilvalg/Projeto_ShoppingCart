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

async function carrinho(param) {
  const section = document.querySelector('.cart__item');
  const api2 = await fetchItem(param);

  section.appendChild(api2);
}

window.onload = () => { 
  products('computador');
};
