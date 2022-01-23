import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
import { SlashCommandBuilder } from '@discordjs/builders';
import { strictEqual } from 'assert';
import fs from 'fs';
import { TLSSocket } from 'tls';

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore"; 
const serviceAccount = require("../kare-bear-firebase-adminsdk-5cqfu-188f66f65b.json"); 
if (getApps().length < 1) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}
const db = getFirestore(); 

export default {
	data: new SlashCommandBuilder()
		.setName('a')
		.setDescription('Add task with mobile settings')
		// .addSubcommand(addSubcommand => addSubcommand.setName('t1'))
		.addStringOption(option => option
			.setName('task')
			.setDescription('[month] [date] [hour] [am/pm] task')),
	async execute(interaction) {	
		var cmd = interaction.options.data[0].value; 
    var month, monthIndex, day, dayIndex, amPm, amPmIndex, hour, hourIndex; 
		switch (cmd) {
			case cmd.toLowerCase().match(/jan/)?.input: 
			month = 0; 
			monthIndex = /jan/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/feb/)?.input: 
			month = 1; 
			monthIndex = /feb/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/mar/)?.input: 
			month = 2; 
			monthIndex = /mar/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/apr/)?.input: 
			month = 3; 
			monthIndex = /apr/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/may/)?.input: 
			month = 4; 
			monthIndex = /may/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/jun/)?.input: 
			month = 5; 
			monthIndex = /jun/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/jul/)?.input: 
			month = 6; 
			monthIndex = /jul/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/aug/)?.input: 
			month = 7; 
			monthIndex = /aug/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/sep/)?.input: 
			month = 8; 
			monthIndex = /sep/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/oct/)?.input: 
			month = 9; 
			monthIndex = /oct/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/nov/)?.input: 
			month = 10; 
			monthIndex = /nov/.exec(cmd.toLowerCase()).index; 
			break; 
			case cmd.toLowerCase().match(/dec/)?.input: 
			month = 11; 
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
      var nextDay; 
			switch(cmd) {
				case cmd.toLowerCase().match(/today/)?.input: 
				monthIndex = /today/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + 
				monthIndex + 1; 
				month = new Date().getMonth(); 
				day = new Date().getDate()
				break; 

				case cmd.toLowerCase().match(/(tomorrow)|(tmr)|(tmrw)/)?.input: 
				monthIndex = /(tomorrow)|(tmr)|(tmrw)/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				tomorrow = new Date(); 
				tomorrow.setDate(new Date().getDate() + 1); 
				month = tomorrow.getMonth(); 
				day = tomorrow.getDate(); 
				break; 

				case cmd.toLowerCase().match(/mon/)?.input: 
				monthIndex = /mon/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (1 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/tue/)?.input: 
				monthIndex = /tue/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (2 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/wed/)?.input: 
				monthIndex = /wed/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (3 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/thu/)?.input: 
				monthIndex = /thu/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (4 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/fri/)?.input: 
				monthIndex = /fri/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (5 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/sat/)?.input: 
				monthIndex = /sat/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (6 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				case cmd.toLowerCase().match(/sun/)?.input: 
				monthIndex = /sun/.exec(cmd.toLowerCase()).index; 
				dayIndex = / /.exec(cmd.substring(monthIndex + 1)).index + monthIndex + 1; 
				nextDay = new Date(); 
				nextDay.setDate(new Date().getDate() + (7 - 1 - new Date().getDay() + 7) % 7 + 1); 
				month = nextDay.getMonth(); 
				day = nextDay.getDate(); 
				break; 

				default: 
				dayIndex = 0; 
				month = new Date().getMonth(); 
				day = new Date().getDate()

			}
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
			if (/\d/.test(cmd.substring(dayIndex, amPmIndex))) {
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
			} else {
				hour = 23; 
				amPmIndex = dayIndex; 
			}
			
		}
		if (amPm === "pm") {
			hour = hour + 12; 
		}		
		var date = new Date(new Date().getFullYear(), month, day, hour);
		if (date.getTimezoneOffset() === 0) {
			date = new Date(date.getTime() + 8*60*60*1000); 
		}
    var docRef = db.collection("discordUsers").doc(interaction.user.id); 
    docRef.get().then((doc) => {
      if (doc.exists) {        
        var tasks = doc.data().tasks;
        tasks.push({
          task: cmd.substring(amPmIndex), 
          date: date.toString()
        }); 
        tasks = new Set(tasks); 
        tasks = [... tasks]
        db.collection("discordUsers").doc(interaction.user.id).update({
          tasks: tasks
        })
        .then((docRef) => {
            if (date.getTimezoneOffset() === 0) {
              date = new Date(date.getTime() - 8*60*60*1000); 
            }
            console.log("Document written with ID: ", docRef);
            interaction.reply({ content: "Added task " + cmd.substring(amPmIndex) + " for " + date.toLocaleString("en-US"), ephemeral: true });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      } else {
        console.log("No such document with add"); 
      }
    }).catch((error) => {
      console.log("Error getting document:", error); 
    }); 
	},
};