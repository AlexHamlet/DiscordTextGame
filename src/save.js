const fs = require('node:fs');
const path = require('node:path');

function saveGame(userId, bookmark) {

    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`SaveFile: ${saveFile}`)
    fs.writeFile(saveFile, JSON.stringify(bookmark), err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Successfully saved file for user ${userId}`)
        }
    });
}

module.exports = {
    saveGame
};
