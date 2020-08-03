"use strict";

const form = document.querySelector("form");
const list = document.querySelector(".list");
const exportButton = document.querySelector("#export");

// renderItems :: DOMElement -> [Item]
const renderItems = (container) => (items) => {
  const newRender = items
    .map(
      (item, index) =>
        `<li>
          <span>${DOMPurify.sanitize(item)}</span>
          <input type="button" onclick="removeItemView(${index})" value="x" />
        </li>`
    )
    .join("");

  if (items.length > 0) {
    exportButton.removeAttribute("disabled");
  } else {
    exportButton.setAttribute("disabled", "true");
  }
  container.innerHTML = newRender;
};

// updateView :: Action
// Action = removeItemView || addItemView
const updateView = (action) =>
  pipe(getItems, action, trace, setItems, getItems, renderItems(list))();

// removeItemView :: Int
const removeItemView = pipe(removeItem, updateView);

// addItemView :: String
const addItemView = pipe(addItem, updateView);

// -- DOM Event Listeners ---------------------------------------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector("[name=item]").value;
  addItemView(name);
  form.reset();
});

exportButton.addEventListener("click", (e) => {
  const pdf = new jsPDF();
  //Set Title
  pdf.setFontSize(22);
  pdf.setFontType("bold");
  pdf.text("Votre super recette", 30, 40);
  //Set ingredients list
  pdf.setFontSize(14);
  pdf.setFontType("normal");
  getItems().map((item, i) => pdf.text(`${i + 1}. ${item}`, 30, 50 + i * 10));
  //Save your PDF
  pdf.save("recette.pdf");
});

//First render
document.addEventListener("DOMContentLoaded", (e) => {
  const innerList = renderItems(list);
  const items = getItems();
  innerList(items);
});
