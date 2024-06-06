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

        //Read file
        let saveData = loadGame(userId);
        console.log(`SaveData: ${saveData}`);

        //Load Page data
        let page = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../', saveData), { encoding: 'utf8', flag: 'r' }));
        console.log(`Page: ${page}`);

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
        saveGame(userId, "Stories/" + option['Path']);

        //Display Text
        message = displayPage(path.join(__dirname, '../../../Stories/', option['Path']));

        await interaction.reply(message);
    },
};



