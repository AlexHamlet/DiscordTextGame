import { SlashCommandBuilder } from '@discordjs/builders';
import displayPage from '../../display';
import saveGame from '../../save';

//TODO let user choose from a list of stories
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

    async execute(interaction: { user: { id: any; }; options: { getString: (arg0: string) => any; }; reply: (arg0: string) => any; }) {
        let responseMessage = "Placeholder";

        const userId = interaction.user.id;
        const chosenStory = interaction.options.getString('story');
        // const storyPath = path.join(`Stories/${chosenStory}`);

        saveGame(userId, chosenStory, "Start");

        responseMessage = displayPage(chosenStory, "Start");

        await interaction.reply(responseMessage);
    },
};
