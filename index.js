// npm init -y && npm i --save-dev node@17 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const utility = require('./utility.js'); 
const cheerio = require('cheerio'); 
const axios = require('axios'); 

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
  setInterval(async function() {
  var url = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=GEOS&course=270&section=201'; 
  // var url = 'https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=LING&course=101'; 
  try {
    var html = await axios.get(url);
    console.log(url); 
    // console.log(typeof html.data); 
    var findValue = '<tr><td width=&#39;200px&#39;>Total Seats Remaining:</td><td align=&#39;left&#39;><strong>'; 
    var index = html.data.search(findValue); 
    console.log(index); 
    console.log(html.data.substring(index + 90, index + 91)); 
    
    if (parseInt(html.data.substring(index + 90, index + 91)) != 0) {
      client.channels.cache.get('579386313028141110').send('<@286376816074293249>' + html.data.substring(index + 90, index + 91)); 

      client.users.fetch('286376816074293249', false).then((user) => {
        user.send(html.data.substring(index + 90, index + 91)); 
      });     
    }            
  } catch {

  }  
  
  }, 1000);     
	// setInterval(function() {
	// 	var usersPath = 'database/users.json'; 
	// 	var usersRead = fs.readFileSync(usersPath); 
	// 	var users = JSON.parse(usersRead); 
	// 	for (const [id, tasks] of Object.entries(users)) {
	// 		for (const task of tasks) {
	// 			if (new Date(task[0]).getTime() - Date.now() <= 1.08e+7) {
	// 				client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
	// 				client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
	// 					user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
	// 				})
	// 			}
	// 		}
	// 	}
	// }, 1.8e+6)

  var usersPath = 'database/users.json'; 
  var usersRead = fs.readFileSync(usersPath); 
  var users = JSON.parse(usersRead); 
  for (const [id, unorderedTasks] of Object.entries(users)) {
    var tasks = utility.getUserTasks(id); 
    tasks.forEach(task => {
      if (new Date(task[0]).getTime() - Date.now() <= 1.08e+7) {
        client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
          client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
            user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
          });  
        if (new Date(task[0]).getTime() - Date.now() <= 3.6e+6) {
          console.debug("Notification timeout: " + new Date((new Date(task[0]).getTime() - Date.now())).toString()); 
          console.debug(new Date(task[0]).getTime()); 
          setTimeout(function() {
            client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
            client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
              user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
            });    
            console.debug("Notification timeout: " + new Date((new Date(task[0]).getTime() - Date.now())).toString()); 
            console.debug(new Date(task[0]).getTime()); 
            setTimeout(function() {
              client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
              client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
                user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
              });
              console.debug("Notification timeout: " + new Date((new Date(task[0]).getTime() - Date.now())).toString()); 
              console.debug(new Date(task[0]).getTime()); 
              setTimeout(function() {
                client.channels.cache.get('579386313028141110').send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
                client.users.fetch(id.substring(2, id.length-1), false).then((user) => {
                  user.send(id + " **" + task[1] + "** " + msToTime(new Date(task[0]).getTime() - Date.now())); 
                });             
              }, 1.2e+6);               
            }, 1.2e+6);          
          }, 1.2e+6); 
        }
      }      
    }); 
  }
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
      const command = client.commands.get('l'); 
			await command.deleteTask(interaction); 
		}
	}
	
});

client.login(token);


function msToTime(duration) {
	var minutes = Math.floor((duration / (1000 * 60)) % 60),
	  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
		
	if (hours <= 0 && minutes <= 0) {		
		return "is past due"; 
	}
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	if (hours <= 0) {
		return "due in " + minutes + " min";
	}
	return "due in " + hours + ":" + minutes; 	
}