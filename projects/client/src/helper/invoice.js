function generateInvoiceNumber() {

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear().toString().slice(-2);
  
    
    var randomNumber = Math.floor(Math.random() * 900) + 100;
    
    var invoiceNumber = day + month + randomNumber + year;
  
    return invoiceNumber;
  }

  export { generateInvoiceNumber }
  