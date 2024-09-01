const fs = require('node:fs');
const path = require('node:path');

function loadGame(userId, story) {
    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`LoadFile: ${saveFile}`);

    let saveData = JSON.parse(fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' }));
    for(let p = 0;p < saveData.length;p++){
        if(saveData['story'] == story)
            return saveData['pageId'];
    }

    console.log(`User ${userId} has no save data for story ${story}`)
}

module.exports = {
    loadGame
};
