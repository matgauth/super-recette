// getItems :: _ -> [Item]
const getItems = () => JSON.parse(localStorage.getItem('items')) || [];

// setItems :: [Item]
const setItems = items => {
  localStorage.setItem('items', JSON.stringify(items));
};

// addItem :: (String, [Item])
const addItem = (text, items) => {
  const id = items.length;
  setItems([...items, { id, text }]);
};

// removeItem :: (Int, [Item])
const removeItem = (id, items) => {
  setItems(items.filter(item => item.id !== id));
};
