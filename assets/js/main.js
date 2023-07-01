
(function ($) {
  'use strict';

  

  $('#download_btn').on('click', function () {
    var downloadSection = $('#download_section');
    var cWidth = downloadSection.width();
    var cHeight = downloadSection.height();
    var topLeftMargin = 40;
    var pdfWidth = cWidth + topLeftMargin * 2;
    var pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
    var canvasImageWidth = cWidth;
    var canvasImageHeight = cHeight;
    var totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

    html2canvas(downloadSection[0], { allowTaint: true }).then(function (
      canvas
    ) {
      canvas.getContext('2d');
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(
        imgData,
        'JPG',
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(
          imgData,
          'JPG',
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 0,
          canvasImageWidth,
          canvasImageHeight
        );
      }
      pdf.save('ivonne-invoice.pdf');
    });
  });
})(jQuery); // End of use strict



// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
  // Get the button element
  var downloadBtn = document.getElementById("download_btn");

  // Add a click event listener to the button
  downloadBtn.addEventListener("click", function() {
    // Create a new jsPDF instance
    var doc = new jsPDF();

    // Get the HTML content to be converted to PDF
    var html = document.documentElement;

    // Convert the HTML to PDF
    doc.fromHTML(html, 15, 15, {
      width: 170
    });

    // Save the PDF file
    doc.save("download.pdf");
  });
});


function appendUniqueString() {
  var url = window.location.href; // Get the current URL

  // Generate a random string
  var uniqueString = Math.random().toString(36).substring(2); // Generates a random alphanumeric string

  // Append the unique string to the URL
  var updatedURL = url + uniqueString;

  // Update the URL in the browser's address bar
  history.replaceState(null, null, updatedURL);
}

/*--------------------------------------------------------------
  ## Down Load Button Function
  ----------------------------------------------------------------*/