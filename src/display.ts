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
    for (const key in page.Options) {
      pageContents += `${page.Options[key].Selector}: ${page.Options[key].Text}\n`;
    }

  return pageContents;
}

export default displayPage;
