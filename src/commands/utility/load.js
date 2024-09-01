const fs = require('node:fs');
const { SlashCommandBuilder } = require('discord.js');
const { loadGame } = require('../../load');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('load')
        .setDescription('Load the last Save')
        .addStringOption(option =>
            option.setName('story')
                .setDescription('The story to load')
                .setRequired(true)),
        async execute(interaction) {
            let responseMessage = "Placeholder";
    
            const userId = interaction.user.id;
            const chosenStory = interaction.options.getString('story');
    
            let pageId = loadGame(userId, chosenStory);
    
            responseMessage = displayPage(chosenStory, pageId);
    
            await interaction.reply(responseMessage);
        },
    };



