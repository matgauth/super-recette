const form = document.querySelector('form');
const list = document.querySelector('.list');
const exportButton = document.querySelector('#export');

const renderItems = container => {
  container.innerHTML = getItems()
    .map(item => {
      return `
        <li>
          <span>${item.text}</span>
          <input type="button" onclick="removeItemView(${item.id})" value="x" />
        </li>
      `;
    })
    .join('');
};

const removeItemView = id => {
  removeItem(id, getItems());
  renderItems(list);
};

const addItemView = e => {
  e.preventDefault();
  const text = form.querySelector('[name=item]').value;
  addItem(text, getItems());
  renderItems(list);
  form.reset();
};

const exportItems = e => {
  const pdf = new jsPDF();
  pdf.setFontSize(22);
  pdf.setFontType('bold');
  pdf.text('Votre super recette', 30, 40);
  pdf.setFontSize(14);
  pdf.setFontType('normal');
  getItems().map((item, i) =>
    pdf.text(`${i + 1}. ${item.text}`, 30, 50 + i * 10)
  );
  pdf.save('recette.pdf');
};

form.addEventListener('submit', addItemView);

exportButton.addEventListener('click', exportItems);

document.addEventListener('DOMContentLoaded', e => renderItems(list));
