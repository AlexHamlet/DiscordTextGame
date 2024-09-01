import { SaveFile, StorySaveInfo } from "./types/SaveFile";
import * as path from 'node:path';
import * as fs from 'node:fs';


function saveGame(userId: string, story: string, pageId: string): void {

    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`SaveFile: ${saveFile}`);

    //Check if save file exists
    let saveContents: SaveFile = {};
    if (fs.existsSync(saveFile)) {
        //Read contents of Save file
        saveContents = JSON.parse(fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' }));
    }

    //Modify the contents
    let storySave: StorySaveInfo = {
        pageId: pageId,
        latest: true,
    };
    for (const key of Object.keys(saveContents)) {
        saveContents[key]['latest'] = false
    }
    saveContents[story] = storySave;

    //Resave file
    fs.writeFile(saveFile, JSON.stringify(saveContents), (err: any) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Successfully saved file for user ${userId}`)
        }
    });
}

export default saveGame;