const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

var usersPath = 'database/users.json'; 
var usersRead = fs.readFileSync(usersPath); 
var usersFile = JSON.parse(usersRead); 

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		console.debug(interaction.commandName); 
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	if (interaction.isSelectMenu()) {
		if (interaction.customId === 'delete tasks') {
			var usersPath = 'database/users.json'; 
			var usersRead = fs.readFileSync(usersPath); 
			var users = JSON.parse(usersRead); 
			for (const element of interaction.values) {
				var tasks = users[interaction.user]
				msg = element.split("\n")[0]; 
				date = element.split("\n")[1]; 
				for (const task of tasks) {
					console.debug(task[0]); 
					console.debug(task[1]); 
					console.debug(date); 
					console.debug(msg); 
					if (task[0] === date && task[1] === msg) {
						tasks.pop(task)
					}
				}
			}
			users[interaction.user] = tasks; 
			usersString = JSON.stringify(users, null, "\t"); 
			fs.writeFileSync(usersPath, usersString); 
			const command = client.commands.get('l');
			await command.execute(interaction); 
		}
	}
	
});

client.login(token);