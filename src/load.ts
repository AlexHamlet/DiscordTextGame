import { SaveFile } from "./types/SaveFile";
import * as path from 'node:path';
import * as fs from 'node:fs';

function loadGame(userId: string, story: string): string {
    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`LoadFile: ${saveFile}`);

    if (fs.existsSync(saveFile)) {
        let saveData: SaveFile = JSON.parse(fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' }));
        return saveData[story].pageId;
    } else {
        console.log(`User ${userId} has no save Data`);
    }

    console.log(`User ${userId} has no save data for story ${story}`)
    throw new Error("User has no save data for story");
}

export default loadGame;
