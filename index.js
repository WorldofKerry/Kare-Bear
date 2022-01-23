// npm init -y && npm i --save-dev node@17 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
const { token } = require('./config.json');
import { getUserTasks } from './utility.js'
import cheerio from 'cheerio';
import axios from 'axios';

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

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore"; 
const serviceAccount = require("./kare-bear-firebase-adminsdk-5cqfu-188f66f65b.json"); 
if (getApps().length < 1) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}
const db = getFirestore(); 

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  let event = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  let command = await import(`./commands/${file}`);
  // console.log(command); 
  // console.log(command.default.data); 
  client.commands.set(command.default.data.name, command.default);
}

// Webscrape notification system
// client.once('ready', () => {
//   console.log('Ready!');
//   setInterval(async function() {
//     var url = '';
//     getCourseSeatRemaining(url, 10).then((value) => {
//       console.log(value);
//       if (value[1] != null && parseInt(value[1]) != 0) {
//         client.channels.cache.get('579386313028141110').send('<@286376816074293249>' + value[0] + " Total Seats Remaining: " + value[1]);

//         client.users.fetch('286376816074293249', false).then((user) => {
//           user.send(value[0] + " Total Seats Remaining: " + value[1]);
//         });
//       }
//     })

//   }, 600000);
// });

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

/**
 * @param {duration} time duraiton in ms
 * @returns human readable format of a time duration * 
 */
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

/**
 * @param {string} url - url to ubc ssc course section page
 * @param {int} maxCalls - max number of calls
 * @returns {array} [course title, remaining seats]
 */
function getCourseSeatRemaining(url, maxCalls) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(function(response) {
      // console.log(response.data);     
      const $ = cheerio.load(response.data);
      let seatsRemaining = $('td:contains("Total Seats Remaining:")').next().children().html();
      // console.log(seatsRemaining); 
      let courseTitle = $('title').html().substring(0, 12);
      resolve([courseTitle, seatsRemaining]);
      // console.log(courseTitle); 
    })
      .catch(function(error) {
        // console.log(error); 
        console.log(error + " on call " + maxCalls);
        // console.log(maxCalls);
        if (maxCalls <= 0) {
          reject(error);
        } else {
          getCourseSeatRemaining(url, maxCalls - 1).then((value) => {
            resolve(value);
          }).catch((error) => {
            reject(error);
          });
        }
      });
  });
}