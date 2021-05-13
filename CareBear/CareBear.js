const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {

    //Prints the client user tag
    console.log("Connected as " + client.user.tag)

    //Sets the activity of the Bot
    client.user.setActivity("Cartoons", {type:"WATCHING"})

    //Cycles through the servers Bot is on
    client.guilds.forEach((guild) => {
        
        //Prints the name of the servers
        console.log(guild.name)

        //Cycles through the channels of each server
        guild.channels.forEach((channel) => {
            
            //Prints the channel name, type and id
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)    
            //General channel id: 397856134360334349    
        })
    })

    //Create generalChannel, set it to above id
    let generalChannel = client.channels.get("397856134360334349")

    //Attach file or image
    const attachment = new Discord.Attachment("https://storiescdn.hornet.com/wp-content/uploads/2018/07/25142737/care-bears-th-1000x500.jpg")

    //Say "Hello,world! or attachment"
    generalChannel.send("Care Bear - Online")
    generalChannel.send(attachment)


})

client.on('message', (recievedMessage) => {
    
    //Checks to make sure bot doesn't respond to own message
    if (recievedMessage.author == client.user) {
        return
    }

    //This is done with Ctrl + K + C and can be undone with Ctrol + K U
    // //Replies to messages
    // recievedMessage.channel.send("Message recieved, " + recievedMessage.author.toString()
    //  +  ": " + recievedMessage.content)
    
    // //React to message using middle finger
    // recievedMessage.react("🖕")

    // // //Figure out code for custom emoji
    // // recievedMessage.guild.emojis.forEach(customEmoji => {
    // //     console.log(`${customEmoji.name} ${customEmoji.id}`)
    // //     recievedMessage.react(customEmoji)
    // // })
    
    // //Now use the code to react with custom emoji
    // let customEmoji = recievedMessage.guild.emojis.get("579370866131861527")
    // recievedMessage.react(customEmoji)

    //Triggers command if ! is first character
    if (recievedMessage.content.startsWith("!")) {
        processCommand(recievedMessage)
    }

})

function processCommand(recievedMessage) {
    
    let fullCommand = recievedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "help") {
        helpCommand(arguments, recievedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, recievedMessage)
    } else {
        recievedMessage.channel.send("Unknown command. Try `!help` or `!multiply`")
    }

}

function multiplyCommand(arguments, recievedMessage) {
    if (arguments.length < 2) {
        recievedMessage.channel.send("Not enough arguments. Try `!Multiply 2 10`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    recievedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}

function helpCommand(arguments, recievedMessage) {
    if (arguments.length == 0) {
        recievedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`, " + recievedMessage.author.toString())
    } else {
        recievedMessage.channel.send("It looks like you need help with " + arguments + ", " + recievedMessage.author.toString())
    }
}

client.login("NTc5MTQ1MDg1ODUwMDkxNTIw.XN9-pA.HHQ1OZACx0goWw640f9FfpPv0EA")