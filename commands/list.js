import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import fs from 'fs';
import { getUserTasks } from '../utility.js'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
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
    .setName('l')
    .setDescription('list the user\'s tasks'),
  async execute(interaction) {
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
    getUserTasks(interaction.user.id).then((tasks) => {
      tasks.forEach(task => {
        // console.log(task.date); 
        // console.log(task.task); 
        var date = new Date(task.date);
        if (date.getTimezoneOffset() === 0) {
          date = new Date(date.getTime() - 8 * 60 * 60 * 1000);
        }
        msg = msg + "**" + task.task + "** due " + date.toLocaleString() + "\n";
        menu.addOptions([
          {
            label: task.task + " due " + date.toLocaleString(),
            value: task.task + "\n" + new Date(task.date).toString()
          }]);
      });
      if (menu['options'].length === 0) {
        menu.addOptions([
          {
            label: "No tasks to delete",
            value: " "
          }
        ])
      }
      // console.log(menu); 
      var menuRow = new MessageActionRow().addComponents(menu);
      interaction.reply({ content: msg, components: [menuRow], ephemeral: true });
    });
  },
  async deleteTask(interaction) {
    var tasksToDelete = []    
    await interaction.values.forEach((element) => {
      var msg = element.split("\n")[0];
      var date = element.split("\n")[1];
      tasksToDelete.push({
          task: msg, 
          date: date
        }); 
    });   
    var docRef = db.collection("discordUsers").doc(interaction.user.id);
    var doc = await docRef.get()
    if (doc.exists) {
      var tasks = doc.data().tasks
      console.log(tasks)
      console.log(tasksToDelete)
      tasks = tasks.filter(task => !tasksToDelete.find(deleteTask => deleteTask.date === task.date && deleteTask.task === task.task));
      console.log(tasks)
      await db.collection("discordUsers").doc(interaction.user.id).update({
          "tasks": tasks
        })
      this.execute(interaction);  
    }    
  }
};