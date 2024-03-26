function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create a custom menu called "Open Websites"
  ui.createMenu('Open Website Details')
      .addItem('Open Lead Info', 'openClientInfo')
      .addToUi();
}

function openClientInfo() {
  // Gets access to current sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  // Gets the website's cell location (on the sheets). This value corresponds to the cell that was selected when initializing the function
  var websiteCell = sheet.getRange(`A${row}`).getValue(); // Assuming websites are in column A

  var urls = [
    websiteCell,
    `https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(websiteCell)}`,
    `https://builtwith.com/?${encodeURIComponent(websiteCell)}`,
    // ... any other URLs you need
  ];

  // Store URLs in the user's properties
  PropertiesService.getUserProperties().setProperty('urls', JSON.stringify(urls));

  // Show sidebar with links
  var htmlOutput = HtmlService.createHtmlOutput('<ul>' +
    urls.map(function(url) {
      return `<li><a href="${url}" target="_blank" onclick="google.script.host.close()">${url}</a></li>`;
    }).join('') +
    '</ul>')
    .setTitle('Open Client Info')
    .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
