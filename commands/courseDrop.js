const { SlashCommandBuilder } = require('@discordjs/builders');
const { strictEqual } = require('assert');
const fs = require('fs');
const { TLSSocket } = require('tls');
const cheerio = require('cheerio'); 
const axios = require('axios'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('drop')
		.setDescription('Replies with Pong!')
    .addStringOption(option => option.setName('url')
      .setDescription('Url to course section').setRequired(true)),
	async execute(interaction) {
    var url = interaction.options.data[0].value; 
    const html = await axios.get(url);
    console.log(url); 
    // console.log(typeof html.data); 
    var findValue = '<tr><td width=&#39;200px&#39;>Total Seats Remaining:</td><td align=&#39;left&#39;><strong>'; 
    var index = html.data.search(findValue); 
    await interaction.reply("Space availible: " + html.data.substring(index + 90, index + 91));
    
    interaction.client.channels.cache.get('579386313028141110').send("<@" + interaction.user.id + ">: Space availible: " + html.data.substring(index + 90, index + 91)); 

    interaction.client.users.fetch(interaction.user.id, false).then((user) => {
      user.send(html.data.substring(index + 90, index + 91)); 
    });   
  //   setInterval(async function() {
  //     var url = interaction.options.data[0].value; 
  //     const html = await axios.get(url);
  //     console.log(url); 
  //     // console.log(typeof html.data); 
  //     var findValue = '<tr><td width=&#39;200px&#39;>Total Seats Remaining:</td><td align=&#39;left&#39;><strong>'; 
  //     var index = html.data.search(findValue); 
  //     console.log(index); 
  //     console.log(html.data.substring(index + 90, index + 91)); 
  //     await interaction.reply(html.data.substring(index + 90, index + 91));
      
  //     client.channels.cache.get('579386313028141110').send(id + html.data.substring(index + 90, index + 91)); 

  //     client.users.fetch(interaction.user.id, false).then((user) => {
  //       user.send(html.data.substring(index + 90, index + 91)); 
  //     });             
  //     }, 10000);     
	},
}; 