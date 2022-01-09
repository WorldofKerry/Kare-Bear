const { SlashCommandBuilder } = require('@discordjs/builders');
const { strictEqual } = require('assert');
const fs = require('fs');
const { TLSSocket } = require('tls');

usersPath = 'database/users.json'; 
usersString = fs.readFileSync(usersPath); 
users = JSON.parse(usersString); 

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
			case cmd.toLowerCase().match(/jan/)?.input: 
			var month = 1; 
			monthIndex = /jan/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/feb/)?.input: 
			var month = 2; 
			monthIndex = /feb/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/mar/)?.input: 
			var month = 3; 
			monthIndex = /mar/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/apr/)?.input: 
			var month = 4; 
			monthIndex = /apr/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/may/)?.input: 
			var month = 5; 
			monthIndex = /may/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/jun/)?.input: 
			var month = 6; 
			monthIndex = /jun/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/jul/)?.input: 
			var month = 7; 
			monthIndex = /jul/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/aug/)?.input: 
			var month = 8; 
			monthIndex = /aug/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/sep/)?.input: 
			var month = 9; 
			monthIndex = /sep/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/oct/)?.input: 
			var month = 10; 
			monthIndex = /oct/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/nov/)?.input: 
			var month = 11; 
			monthIndex = /nov/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/dec/)?.input: 
			var month = 12; 
			monthIndex = /dec/.exec(cmd.toLowerCase()).index; 
			break; 		
		}
		if (typeof month !== 'undefined') {
			monthIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
			dayIndex = /\d/.exec(cmd.substring(monthIndex)).index + monthIndex; 
			if (/^\d+$/.test(cmd.charAt(dayIndex + 1))) {
				day = parseInt(cmd.substring(dayIndex, dayIndex + 2)); 
				dayIndex+=2; 
			} else {
				day = parseInt(cmd.substring(dayIndex, dayIndex + 1)); 
				dayIndex++; 
			}
		} else {
			switch(cmd) {
				case cmd.toLowerCase().match(/today/)?.input: 
				monthIndex = /today/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + 
				monthIndex + 1; 
				var month = new Date().getMonth(); 
				day = new Date().getDate()
				break; 

				case cmd.toLowerCase().match(/(tomorrow)|(tmr)|(tmrw)/)?.input: 
				monthIndex = /(tomorrow)|(tmr)|(tmrw)/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				tomorrow = new Date(); 
				tomorrow.setDate(new Date().getDate() + 1); 
				var month = tomorrow.getMonth(); 
				day = tomorrow.getDate(); 
				console.debug(month + " " + day); 
				break; 

				case cmd.toLowerCase().match(/mon/)?.input: 
				monthIndex = /mon/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (1 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/tue/)?.input: 
				monthIndex = /tue/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (2 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/wed/)?.input: 
				monthIndex = /wed/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (3 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/thu/)?.input: 
				monthIndex = /thu/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (4 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/fri/)?.input: 
				monthIndex = /fri/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (5 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/sat/)?.input: 
				monthIndex = /sat/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (6 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/sun/)?.input: 
				monthIndex = /sun/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (7 - 1 - new Date().getDay() + 7) % 7 + 1); 
				var month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 
			}
		}		
		if (/(pm )|(PM )|(Pm )/.test(cmd.substring(dayIndex))) {
			amPm = "pm"; 
			amPmIndex = /(pm )|(PM )|(Pm )/.exec(cmd.substring(dayIndex)).index + dayIndex + 3; 
			console.debug(dayIndex + " " + amPmIndex); 
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
		date = new Date(new Date().getFullYear(), month, day, hour); 
		data = new Date(date.toString()); 
		if (interaction.user in users) {
			users[interaction.user].push([date.toString(), cmd.substring(amPmIndex)]); 
		} else {
			users[interaction.user] = [[date.toString(), cmd.substring(amPmIndex)]]; 
		}
		usersString = JSON.stringify(users, null, "\t"); 
		fs.writeFileSync(usersPath, usersString)
		await interaction.reply({ content: interaction.user.toString() + " " + date.toString() + " " + cmd.substring(amPmIndex), ephemeral: true}); 
	},
};