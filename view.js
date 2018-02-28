const form = document.querySelector('form');
const list = document.querySelector('.list');
const exportButton = document.querySelector('#export');

const renderItems = container => items => {
  const newRender = items
    .map(
      (item, index) => `
        <li>
          <span>${item}</span>
          <input type="button" onclick="removeItemView(${index})" value="x" />
        </li>
      `
    )
    .join('');
  container.innerHTML = newRender;
};

const removeItemView = id =>
  pipe(
    getItems,
    removeItem(id),
    trace('removeItem'),
    setItems,
    getItems,
    renderItems(list)
  )();

const addItemView = e => {
  e.preventDefault();
  const name = form.querySelector('[name=item]').value;
  pipe(
    getItems,
    addItem(name),
    trace('addItem'),
    setItems,
    getItems,
    renderItems(list)
  )();
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

document.addEventListener('DOMContentLoaded', e => {
  const innerList = renderItems(list);
  innerList(getItems());
});
