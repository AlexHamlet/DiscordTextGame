const fs = require('node:fs');

function displayPage(story, pageId) {

  console.log(story);

  //Read file
  let filecontents = fs.readFileSync(story, { encoding: 'utf8', flag: 'r' });

  //Parse Json
  const page = JSON.parse(filecontents);

  //Compile Return string
  let pageContents = page[pageId]['Text'] + '\n\n';

  if (page['Options'])
    for (let p = 0; p < page['Options'].length; p++) {
      pageContents += `${page['Options'][p]['Selector']}: ${page['Options'][p]['Text']}\n`;
    }

  return pageContents;
}

module.exports = {
  displayPage
};
