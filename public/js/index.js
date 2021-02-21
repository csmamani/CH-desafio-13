const socket = io();
const form = document.getElementById('form');
const titleInput = document.getElementById('titleInput');
const priceInput = document.getElementById('priceInput');
const thumbnailInput = document.getElementById('thumbnailInput');
const table = document.getElementById('tableBody');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let title = titleInput.value;
  let price = Number(priceInput.value);
  let thumbnail = thumbnailInput.value;

  if (title && price && thumbnail) {
    socket.emit(`producto`, { title, price, thumbnail });
  }

  socket.on('producto', (producto) => {
    let productoLinea = document.createElement('tr');
    let titleValue = document.createElement('td');
    titleValue.textContent = producto.title;
    productoLinea.appendChild(titleValue);

    let priceValue = document.createElement('td');
    priceValue.textContent = `$ ${producto.price}`;
    productoLinea.appendChild(priceValue);

    let thumbnailValue = document.createElement('td');
    let imgUrl = document.createElement('img');
    imgUrl.setAttribute('src', producto.thumbnail);
    thumbnailValue.appendChild(imgUrl);
    productoLinea.appendChild(thumbnailValue);

    console.log(productoLinea);

    table.appendChild(productoLinea);
  });

  titleInput.value = '';
  priceInput.value = '';
  thumbnailInput.value = '';
});
