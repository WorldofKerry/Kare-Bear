const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const fs = require('fs');
const utility = require('../utility.js'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('l')
		.setDescription('list the user\'s tasks'),
	async execute(interaction) {
		var usersPath = 'database/users.json'; 
		var usersRead = fs.readFileSync(usersPath); 
		var users = JSON.parse(usersRead); 
		const buttonRow = new MessageActionRow()
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
		var menu = new MessageSelectMenu().setCustomId('delete tasks').setPlaceholder('Delete Tasks').setMinValues(1); 
		var msg = "Your Tasks: \n"; 
    var tasks = utility.getUserTasks(interaction.user); 
    tasks.forEach(task => {		
		var date = new Date(task[0]); 
		console.debug(date.getTimezoneOffset()); 
		if (date.getTimezoneOffset() === 0) {
      console.debug(date.toString()); 
			date = new Date(date.getTime() - 7*60*60*1000); 
      console.debug(date.toString()); 
		}
		msg = msg + "**" + task[1] + "** due " + date.toLocaleString() + "\n"; 
		menu.addOptions([
		{
			label: task[1] + " due " + date.toLocaleString(), 
			value: task[1] + "\n" + new Date(task[0]).toString()
		}]); 
    })
		if (menu['options'].length === 0) {
			menu.addOptions([
				{
					label: "No tasks to delete", 
					value: " "
				}
			])
		}
		var menuRow = new MessageActionRow().addComponents(menu); 
		await interaction.reply({ content: msg, components: [menuRow], ephemeral: false}); 
	},
  async deleteTask(interaction) {
    	var usersPath = 'database/users.json'; 
			var usersRead = fs.readFileSync(usersPath); 
			var users = JSON.parse(usersRead); 
      var tasks = users[interaction.user] 
			for (const element of interaction.values) {				       
				var msg = element.split("\n")[0]; 
				var date = element.split("\n")[1];
        tasks = tasks.filter(task => (new Date(task[0]).getTime() != new Date(date).getTime() || task[1] != msg)); 
			}
      users[interaction.user] = tasks; 
			usersString = JSON.stringify(users, null, "\t"); 
			fs.writeFileSync(usersPath, usersString); 
			await this.execute(interaction); 
  }
};