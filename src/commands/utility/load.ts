import { SlashCommandBuilder } from '@discordjs/builders';
import loadGame from '../../load';
import displayPage from '../../display';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('load')
        .setDescription('Load the last Save')
        .addStringOption(option =>
            option.setName('story')
                .setDescription('The story to load')
                .setRequired(true)),
        async execute(interaction: { user: { id: any; }; options: { getString: (arg0: string) => any; }; reply: (arg0: string) => any; }) {
            let responseMessage = "Placeholder";
    
            const userId = interaction.user.id;
            const chosenStory = interaction.options.getString('story');
    
            let pageId = loadGame(userId, chosenStory);
    
            responseMessage = displayPage(chosenStory, pageId);
    
            await interaction.reply(responseMessage);
        },
    };



