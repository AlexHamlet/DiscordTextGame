const fs = require('node:fs');
const path = require('node:path');

function displayPage(story, pageId) {
  //Read file
  const storyPath = path.join(__dirname, '../Stories/' + story + '.json');
  let filecontents = JSON.parse(fs.readFileSync(storyPath, { encoding: 'utf8', flag: 'r' }));

  //Read page
  let page = filecontents[pageId];

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
