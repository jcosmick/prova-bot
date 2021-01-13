const { Client } = require('discord.js');

module.exports ={
    commands: ['changelog', "cl"],
    permissionError: 'errore',
    minArgs: 0,
    chiutilizza: ["145522053733154816", "301837981872816129"],
    cancellaMessaggio: true,
    callback: (msg, args, text ) => {
      /*  var changelog = 
        {
            "log": "ciao"
        }
      */
        
        const Discord = require('discord.js');
        const fs = require('fs');
        var changelog = JSON.parse(fs.readFileSync('./changelog.json'));

        const EmbedLog = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Nora è stata aggiornata!')
        .setAuthor('jcosmick & Masterpolpetta')
        .setDescription(changelog.log);

        
       

        console.log(changelog)

        if(args[0]=="edit")
        {   
            changelog.log = text.substring(args[0].length+1);
            var nuovoLog= JSON.stringify(changelog);
            fs.writeFile('./changelog.json', nuovoLog, (err) => {
                if (err) throw err;
                console.log('Log salvato');
            });
        }
        else
        {
            
            console.log(changelog.log);
            msg.channel.send(EmbedLog);
        }
}
}
