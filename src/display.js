const fs = require('node:fs');

function displayPage(story, pageId) {
  //Read file
  let filecontents = JSON.parse(fs.readFileSync(story, { encoding: 'utf8', flag: 'r' }));

  //Read page
  let page = {};
  for (let p = 0; p < filecontents.length; p++) {
    if (filecontents[p]['id'] == pageId) {
      page = filecontents[p];
    }
  }

  //Compile Return string
  let pageContents = page['Text'] + '\n\n';

  if (page['Options'])
    for (let p = 0; p < page['Options'].length; p++) {
      pageContents += `${page['Options'][p]['Selector']}: ${page['Options'][p]['Text']}\n`;
    }

  return pageContents;
}

module.exports = {
  displayPage
};
