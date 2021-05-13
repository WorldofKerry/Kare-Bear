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
        })
    })

    //Create generalChannel, set it to above id
    let generalChannel = client.channels.get("579386313028141110")

    //Attach file or image
    const attachment = new Discord.Attachment("https://storiescdn.hornet.com/wp-content/uploads/2018/07/25142737/care-bears-th-1000x500.jpg")

    //Say "Hello,world! or attachment"
    generalChannel.send("Care Bear - Online")
    // generalChannel.send(attachment)


})

client.on('message', (recievedMessage) => {
    
    //Checks to make sure bot doesn't respond to own message
    if (recievedMessage.author == client.user) {
        return
    }

    if (recievedMessage.channel.id == 579386313028141110 && recievedMessage.content.startsWith("!")) {
        const fs = require('fs') //importing file save
        var xpPath = 'data.json'
        var xpRead = fs.readFileSync(xpPath);
        var xpFile = JSON.parse(xpRead); //ready for use
        var userId = recievedMessage.author.id //user id here
        if (!xpFile[userId]) { //this checks if data for the user has already been created
            xpFile[userId] = {xpp: 0, xppr: 0, currentRole: ""}; //if not, create it
            fs.writeFileSync(xpPath, JSON.stringify(xpFile, null, 2));
        }
    } else {
        //as an example, I will give the owner of the id 50 xp and the role "Awesome Role"
        var xppVar = Number(xpFile.xpp) + 50 //add 50 to their original xp
        var xpprVar = Number(xpFile.xppr)
        var roleToGive = "Awesome Role"
        xpFile[userId] = {xpp: xppVar, xppr: xpprVar, currentRole: roleToGive};
        fs.writeFileSync(xpPath, JSON.stringify(xpFile, null, 2));
        console.log(`Changed that player's xp to ${xppVar} and gave him the role ${roleToGive}`)

    }

})

function processChat(recievedMessage){
    
    processKeyword(recievedMessage, "periodic", "Here's the link to a periodic table: https://ptable.com/")
    processKeyword(recievedMessage, "meme", "no u", "withName")
    processKeyword(recievedMessage, "creator", "Kerry Wang created me", "withName")
    processKeyword(recievedMessage, "name", "my name's Care Bear!", "withName")
    processKeyword(recievedMessage, "website", "processWebsiteLink", "function")
    
}


function processKeyword(recievedMessage, keyword, response, responseStyle) {
    
    if (recievedMessage.content.toUpperCase().indexOf(keyword.toUpperCase()) >= 0) {
        
        if (responseStyle == "withName") {
            recievedMessage.channel.send(recievedMessage.author + ", " + response)
            console.log("withname worked")
        } else if ((responseStyle == "function") && (response == "processWebsiteLink")) {
            processWebsiteLink(recievedMessage)
        } else {
            recievedMessage.channel.send(response)
            console.log("normal")
        }

        replyEmoji(recievedMessage)

    }
    
}

function replyEmoji(recievedMessage) {
    let loveEmoji = recievedMessage.guild.emojis.get("579419133851074560")
    recievedMessage.react(loveEmoji)
}

function processWebsiteLink(recievedMessage) {
    
    let websites = [
        ["taylor", "m", "https://sd41blogs.ca/taylora/"], 
        ["shim", "f", "http://shimchemistry.tk/"], 
        ["paterson", "f", "https://patersonmath.weebly.com/"], 
        ["mcphee", "m", "http://mcpheesics.weebly.com/"]
    ]

    websites.forEach((website) => {
        
        let teacherUpperCaseName = website[0].toUpperCase()
        
        if (recievedMessage.content.toUpperCase().indexOf(teacherUpperCaseName) >= 0) {
            
            let teacherLowerCaseName = teacherUpperCaseName.toLowerCase()
            let teacherFirstLetter = teacherLowerCaseName.substr(0, 1).toUpperCase()  
            let teacherLastLetter = teacherLowerCaseName.substr(teacherLowerCaseName.length-1, teacherLowerCaseName.length)      
            let teacherRemainingLetters = teacherLowerCaseName.substr(1, teacherLowerCaseName.length)
            
            let is = "'s"
            if (teacherLastLetter == "s") {
                is = "'"
            }            
            if (website[1] == "m") {
                recievedMessage.channel.send("Here's the link to Mr. " + teacherFirstLetter + teacherRemainingLetters + is + " website is: " + website[2])
            }
            if (website[1] == "f") {
                recievedMessage.channel.send("Here's the link to Ms. " + teacherFirstLetter + teacherRemainingLetters + is + " website is: " + website[2])
            }            
        }
    })

}

function processCommand(recievedMessage) {
    
    let fullCommand = recievedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "help") {
        helpCommand(arguments, recievedMessage)
    } else if (primaryCommand == "chat") {
        processChat(recievedMessage)      
    } else {
        recievedMessage.channel.send("Unknown command. Try `!help` or chatting with me in `bot-chat`")
    }

}

function helpCommand(arguments, recievedMessage) {
    if (arguments.length == 0) {
        recievedMessage.channel.send(recievedMessage.author + ", I'm not sure what you need help with. Try `!help [topic]`")
    } else if (arguments[0].toUpperCase() == "WEBSITE"){
        recievedMessage.channel.send(recievedMessage.author + ", try `website [teacher's name]`")
    } else {
        recievedMessage.channel.send(recievedMessage.author + ", It looks like you need help with " + arguments + ". " + arguments + " is not within my database, please contact a moderator. ")
    }
}

client.login("NTc5MTQ1MDg1ODUwMDkxNTIw.XN9-pA.HHQ1OZACx0goWw640f9FfpPv0EA")