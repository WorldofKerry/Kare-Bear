const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jesus')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('done')
					.setLabel('Done')
					.setStyle('SUCCESS')
					.setEmoji('✅'), 
				new MessageButton()
					.setCustomId('delete')
					.setLabel('Delete')
					.setStyle("DANGER")
					.setEmoji('❌'), 					
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
	},
};