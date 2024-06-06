const fs = require('node:fs');
const { SlashCommandBuilder } = require('discord.js');
const { loadGame } = require('../../load');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('load')
        .setDescription('Load the last Save'),
        async execute(interaction) {
            let responseMessage = "Placeholder";
    
            const userId = interaction.user.id;
    
            let saveData = loadGame(userId);
    
            responseMessage = displayPage(saveData);
    
            await interaction.reply(responseMessage);
        },
    };



