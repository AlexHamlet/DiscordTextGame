const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');
const { saveGame } = require('../../save')
const { displayPage } = require('../../display')

function getStories() {
    const foldersPath = path.join(__dirname, 'stories');
    const storyFolders = fs.readdirSync(foldersPath);
    return storyFolders;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts the selected story')
        .addStringOption(option =>
            option.setName('story')
                .setDescription('The story to begin')
                .setRequired(true)),

    async execute(interaction) {
        let responseMessage = "Placeholder";

        const userId = interaction.user.id;
        const chosenStory = interaction.options.getString('story');
        const storyPath = path.join(`Stories/${chosenStory}/Start.json`);

        saveGame(userId, storyPath);

        responseMessage = displayPage(storyPath);

        await interaction.reply(responseMessage);
    },
};
