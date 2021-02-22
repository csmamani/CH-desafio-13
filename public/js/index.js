const socket = io();
const form = document.getElementById('form');
const table = document.getElementById('tableBody');

socket.on('message', (message) => console.log(message));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let title = document.getElementById('titleInput').value;
  let price = Number(document.getElementById('priceInput').value);
  let thumbnail = document.getElementById('thumbnailInput').value;

  if (title && price && thumbnail) {
    socket.emit('addProduct', { title, price, thumbnail });
  }

  socket.on('product', ({ title, price, thumbnail }, callback) => {
    let productRow = document.createElement('tr');
    let titleCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let thumbnailCell = document.createElement('td');
    let imgUrl = document.createElement('img');

    table.appendChild(productRow);
    productRow.appendChild(titleCell);
    productRow.appendChild(priceCell);
    productRow.appendChild(thumbnailCell);
    thumbnailCell.appendChild(imgUrl);

    titleCell.textContent = title;
    priceCell.textContent = `$ ${price}`;
    imgUrl.setAttribute('src', thumbnail);
  });

  form.reset();
});
