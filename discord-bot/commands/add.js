const { SlashCommandBuilder } = require('@discordjs/builders');
const { strictEqual } = require('assert');
const fs = require('fs');

var usersPath = 'database/users.json'; 
var usersRead = fs.readFileSync(usersPath); 
var users = JSON.parse(usersRead); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('am')
		.setDescription('Add task with mobile settings')
		// .addSubcommand(addSubcommand => addSubcommand.setName('t1'))
		.addStringOption(option => option
			.setName('cmd')
			.setDescription('command')),
		// 	.addChoice('test', 'testing'))
		// .addStringOption(option => option.setName('task').setDescription('Task for automatic parsing')),
		// .addSubcommand(subcommand => subcommand.setName('user')
		// 	.setDescription("info about user")
		// 	.addUserOption(option => option
		// 		.setName('target')
		// 		.setDescription('The user'))
		// 		.set
		// 	.addUserOption(option => option
		// 		.setName('soup')
		// 		.setDescription('fish')))
		// .addSubcommand(subcommand => subcommand.setName('server')
		// 	.setDescription('info about the server')),
	async execute(interaction) {	
		cmd = interaction.options.data[0].value	
		month = 0; 
		monthMatch = 0; 
		switch (cmd) {
			case cmd.match(/ jan /)?.input: 
			month = 1; 
			monthMatch = / jan /.exec(cmd); 
			break; 
			case cmd.match(/ feb /)?.input: 
			month = 2; 
			monthMatch = / feb /.exec(cmd); 
			break; 
			case cmd.match(/ mar /)?.input: 
			month = 3; 
			monthMatch = / mar /.exec(cmd); 
			break; 
			case cmd.match(/ apr /)?.input: 
			month = 4; 
			monthMatch = / apr /.exec(cmd); 
			break; 
			case cmd.match(/ may /)?.input: 
			month = 5; 
			monthMatch = / may /.exec(cmd); 
			break; 
			case cmd.match(/ jun /)?.input: 
			month = 6; 
			monthMatch = / jun /.exec(cmd); 
			break; 
			case cmd.match(/ jul /)?.input: 
			month = 7; 
			monthMatch = / jul /.exec(cmd); 
			break; 
			case cmd.match(/ aug /)?.input: 
			month = 8; 
			monthMatch = / aug /.exec(cmd); 
			break; 
			case cmd.match(/ sep /)?.input: 
			month = 9; 
			monthMatch = / sep /.exec(cmd); 
			break; 
			case cmd.match(/ oct /)?.input: 
			month = 10; 
			monthMatch = / oct /.exec(cmd); 
			break; 
			case cmd.match(/ nov /)?.input: 
			month = 11; 
			monthMatch = / nov /.exec(cmd); 
			break; 
			case cmd.match(/ dec /)?.input: 
			month = 12; 
			monthMatch = / dec /.exec(cmd); 
			break; 			
		}
		day = 0; 
		dayMatch = /[0-9]/.exec(cmd.substring(monthMatch.index)); 
		if (/^\d+$/.test(cmd.charAt(dayMatch.index + monthMatch.index + 1))) {
			day = cmd.substring(dayMatch.index + monthMatch.index, dayMatch.index + monthMatch.index + 2); 
		} else {
			day = cmd.substring(dayMatch.index + monthMatch.index, dayMatch.index + monthMatch.index + 1); 
		}
		await interaction.reply(month.toString() + " " + day)
	},
};