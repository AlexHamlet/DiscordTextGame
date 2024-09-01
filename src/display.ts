import { StoryFile } from "./types/StoryFile";
import * as path from 'node:path';
import * as fs from 'node:fs';

function displayPage(story: string, pageId: string) {
  //Read file
  const storyPath = path.join(__dirname, '../Stories/' + story + '.json');
  let filecontents: StoryFile = JSON.parse(fs.readFileSync(storyPath, { encoding: 'utf8', flag: 'r' }));

  //Read page
  let page = filecontents[pageId];

  //Compile Return string
  let pageContents = page.Text + '\n\n';

  if (page.Options)
    for (let p = 0; p < page.Options.length; p++) {
      pageContents += `${page.Options[p].Selector}: ${page.Options[p].Text}\n`;
    }

  return pageContents;
}

export default displayPage;
