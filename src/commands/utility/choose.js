const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');
const { loadGame } = require('../../load');
const { saveGame } = require('../../save');
const { displayPage } = require('../../display');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Select an option from a menu')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('The path to take')
                .setRequired(true)),
    async execute(interaction) {
        let message = 'Placeholder message'
        const userId = interaction.user.id;

        //Get Last Story
        let saveFile = path.join(__dirname, '../../../', 'Saves/' + userId + '.json');
        if (!fs.existsSync(saveFile)) {
            await interaction.reply("It seems like you haven't opened a story yet.  Run the /start command to do so.");
            return;
        }
        let saveContents = JSON.parse(fs.readFileSync(saveFile, { encoding: 'utf8', flag: 'r' }));
        let story = {};
        for (const key of Object.keys(saveContents)) {
            if(saveContents[key]['latest']){
                story = key;
            }
        }

        //Load the story file
        let storyFile = path.join(__dirname, '../../../', 'Stories/' + story + '.json');
        let storyFileContents = JSON.parse(fs.readFileSync(storyFile, { encoding: 'utf8', flag: 'r' }));

        //Find page
        let pageId = loadGame(userId, story);
        let page = storyFileContents[pageId];
        console.log(page);

        //Choose option
        if (!page['Options']) {
            await interaction.reply("It seems like the story has ended.");
            return;
        }

        let option = page['Options'].find((element) => element.Selector == interaction.options.getString('option'));

        if (!option) {
            await interaction.reply("I'm not sure how to convey that.  Ensure your selection is one of the given options.");
            return;
        }

        //Save the Game
        saveGame(userId, story, option['Path']);

        //Display Text
        message = displayPage(story, option['Path']);

        await interaction.reply(message);
    },
};



