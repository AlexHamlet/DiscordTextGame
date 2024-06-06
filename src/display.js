const fs = require('node:fs');

function displayPage(path) {

  console.log(path);

  //Read file
  let filecontents = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });

  //Parse Json
  const page = JSON.parse(filecontents);

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
