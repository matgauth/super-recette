const getItems = () => JSON.parse(localStorage.getItem('items')) || [];

const setItems = items => {
  localStorage.setItem('items', JSON.stringify(items));
};

const addItem = (text, items) => {
  const id = items.length;
  setItems([...items, { id, text }]);
};

const removeItem = (id, items) => {
  setItems(items.filter(item => item.id !== id));
};
