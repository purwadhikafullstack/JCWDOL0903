function convertToDate(dateString) {
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    var date = new Date(dateString);
    var convertedDate = date.toLocaleDateString('en-US', options);
    
    // Rearrange the day and month components
    var parts = convertedDate.split(' ');
    var day = parts[1];
    var month = parts[0];
    var year = parts[2];
    convertedDate = day + ' ' + month + ' ' + year;
  
    return convertedDate;
  }

  export { convertToDate }
  