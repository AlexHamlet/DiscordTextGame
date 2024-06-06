const fs = require('node:fs');
const path = require('node:path');

function loadGame(userId) {
    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`LoadFile: ${saveFile}`);
    // let filecontents = fs.readFileSync(path.join(__dirname, '../Stories/', saveFile), { encoding: 'utf8', flag: 'r' });
    let filecontents = fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(filecontents);
}

module.exports = {
    loadGame
};
