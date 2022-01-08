const { SlashCommandBuilder } = require('@discordjs/builders');
const { strictEqual } = require('assert');
const fs = require('fs');
const { TLSSocket } = require('tls');

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
		switch (cmd) {
			case cmd.match(/ jan/)?.input: 
			month = 1; 
			monthIndex = / jan/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ feb/)?.input: 
			month = 2; 
			monthIndex = / feb/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ mar/)?.input: 
			month = 3; 
			monthIndex = / mar/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ apr/)?.input: 
			month = 4; 
			monthIndex = / apr/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ may/)?.input: 
			month = 5; 
			monthIndex = / may/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ jun/)?.input: 
			month = 6; 
			monthIndex = / jun/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ jul/)?.input: 
			month = 7; 
			monthIndex = / jul/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ aug/)?.input: 
			month = 8; 
			monthIndex = / aug/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ sep/)?.input: 
			month = 9; 
			monthIndex = / sep/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ oct/)?.input: 
			month = 10; 
			monthIndex = / oct/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ nov/)?.input: 
			month = 11; 
			monthIndex = / nov/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 
			case cmd.match(/ dec/)?.input: 
			month = 12; 
			monthIndex = / dec/.exec(cmd).index; 
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			break; 			
		}
		dayIndex = /\d/.exec(cmd.substring(monthIndex)).index + monthIndex; 
		if (/^\d+$/.test(cmd.charAt(dayIndex + 1))) {
			day = parseInt(cmd.substring(dayIndex, dayIndex + 2)); 
			dayIndex+=2; 
		} else {
			day = parseInt(cmd.substring(dayIndex, dayIndex + 1)); 
			dayIndex++; 
		}
		if (/(pm )|(PM )|(Pm )/.test(cmd.substring(dayIndex))) {
			amPm = "pm"; 
			amPmIndex = /(pm )|(PM )|(Pm )/.exec(cmd.substring(dayIndex)).index + dayIndex + 3; 
			hourIndex = /\d/.exec(cmd.substring(dayIndex, amPmIndex)).index + dayIndex; 
			if (/^\d$/.test(cmd.charAt(hourIndex + 1))) {
				hour = parseInt(cmd.substring(hourIndex, hourIndex + 2)); 
				hourIndex+=2; 
			} else {
				hour = parseInt(cmd.substring(hourIndex, hourIndex + 1)); 
				hourIndex++; 
			}
		} else {
			amPm = "am"; 
			if (/(am )|(AM )|(Am )/.test(cmd.substring(dayIndex))) {
				amPmIndex = /(am )|(AM )|(Am )/.exec(cmd.substring(dayIndex)).index + dayIndex + 3; 
			} else {
				amPmIndex = cmd.length; 
			}
			hourIndex = /\d/.exec(cmd.substring(dayIndex, amPmIndex)).index + dayIndex; 
			if (/^\d$/.test(cmd.charAt(hourIndex + 1))) {
				hour = parseInt(cmd.substring(hourIndex, hourIndex + 2)); 
				hourIndex+=2; 
			} else {
				hour = parseInt(cmd.substring(hourIndex, hourIndex + 1)); 
				hourIndex++; 
			}
			if (amPmIndex == cmd.length) {
				amPmIndex = hourIndex + 1; 
			}
		}
		if (amPm === "pm") {
			hour = hour + 12; 
		}
		date = new Date(new Date().getFullYear(), month, day, hour)
		await interaction.reply(date.toString() + " " + cmd.substring(amPmIndex)); 
	},
};