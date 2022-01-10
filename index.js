const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Keep bot online
const express = require("express")
const app = express()
app.listen(3000, () => {
  console.log("Kare Bear Online"); 
})
app.get("/", (req, res) => {
  res.send("Loading Bearhub...");
})

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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
	setInterval(function() {
		var usersPath = 'database/users.json'; 
		var usersRead = fs.readFileSync(usersPath); 
		var users = JSON.parse(usersRead); 
		for (const [id, tasks] of Object.entries(users)) {
			for (const task of tasks) {
				// console.debug(new Date(task[0]).getTime()); 
				// console.debug(Date.now()); 
				// console.debug(client.channels.cache.get('397856134360334349').send("test"))
				// console.debug(client.users.cache)
				// console.debug(client.users.cache.get(id.substring(2, id.length-2))); 
				if (new Date(task[0]).getTime() - Date.now() <= 1.08e+7) {
					client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
					client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
						user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
					})
				}
			}
		}
	}, 1.8e+6)
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
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


function msToTime(duration) {
	var minutes = Math.floor((duration / (1000 * 60)) % 60),
	  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		
	console.debug(hours + " " + minutes); 
	if (hours <= 0 && minutes <= 0) {		
		return "is past due"; 
	}
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	if (hours <= 0) {
		return "due in " + minutes + " min";
	}
	return "due in " + hours + ":" + minutes; 	
  }