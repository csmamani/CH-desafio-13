const socket = io();
const form = document.getElementById('form');
const table = document.getElementById('tableBody');
const inputTitle = document.getElementById('titleInput');
const inputPrice = document.getElementById('priceInput');
const inputThumbnail = document.getElementById('thumbnailInput');

const msgContainer = document.getElementById('messages');
const msgForm = document.getElementById('msg-form');
const inputEmail = document.getElementById('email-input');
const inputMsg = document.getElementById('message-input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let title = inputTitle.value;
  let price = Number(inputPrice.value);
  let thumbnail = inputThumbnail.value;

  if (title && price && thumbnail) {
    socket.emit('addProduct', { title, price, thumbnail });
    inputTitle.nodeValue = '';
    inputPrice.nodeValue = '';
    inputThumbnail.nodeValue = '';
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

msgForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let email = inputEmail.value;
  let date = new Date();
  let msg = inputMsg.value;

  if (email && msg) {
    socket.emit('addMessage', { email, date, msg });
    inputMsg.value = '';
  }

  socket.on('showMessage', ({ email, date, msg }) => {
    let message = document.createElement('div');

    message.className = 'message';
    message.innerHTML = `<span class="email">${email}</span>
                          <span class="date">${date}</span>
                          <span class="msg">${msg}</span>`;

    msgContainer.appendChild(message);
  });
});
