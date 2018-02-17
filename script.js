document.addEventListener('DOMContentLoaded', event => {
  const form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    createPdfFromForm(form, 'Bidule');
  });

  // createPdfFromForm :: (HTMLElement, String) -> ()
  const createPdfFromForm = (elements, pdfName) => {
    var pdf = new jsPDF();
    //Title
    pdf.setFontSize(22);
    pdf.setFontType('bold');
    pdf.text(pdfName, 50, 40);
    //Elements
    pdf.setFontSize(14);
    pdf.setFontType('normal');
    // Write on pdf file
    pdf.text('Nom : ' + elements.lastname.value, 50, 50);
    pdf.text('Prénom : ' + elements.firstname.value, 50, 55);

    pdf.save(pdfName + '.pdf');
  };
});
