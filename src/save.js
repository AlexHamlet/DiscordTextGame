const fs = require('node:fs');
const path = require('node:path');

function saveGame(userId, story, pageId) {

    let saveFile = path.join(__dirname, '../', 'Saves/' + userId + '.json');
    console.log(`SaveFile: ${saveFile}`);

    //Check if save file exists
    let saveContents = [];
    if(fs.existsSync(saveFile)){
        //Read contents of Save file
        saveContents = JSON.parse(fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' }));
    }

    //Modify the contents
    let storySave = {};
    for(let p = 0;p < saveContents.length;p++){
        if(saveContents[p]['story'] == story){
            delete saveContents[p];
            break;
        }
    }
    storySave['pageId'] = pageId;
    storySave['story'] = story;
    saveContents.unshift(storySave)

    //Resave file
    fs.writeFile(saveFile, JSON.stringify(saveContents), err => {
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
