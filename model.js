// -- Items Model ----------------------------------------------------------

// getItems :: [Item]
const getItems = () => JSON.parse(localStorage.getItem('items')) || [];

// setItems :: [Item]
const setItems = items => localStorage.setItem('items', JSON.stringify(items));

// addItem :: (String -> [Item]) -> [Item]
const addItem = name => items => [...items, name];

// removeItem :: (Int -> [Item]) -> [Item]
const removeItem = id => items => items.filter((_, index) => index !== id);
