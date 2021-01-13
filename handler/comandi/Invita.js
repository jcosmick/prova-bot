module.exports ={
    commands: ['invita', 'invite'],
    exectedArgs: ['<num1> <num2>'],
    permissionError: 'errore',
    minArgs: 0,
    //maxArgs: 2,
    callback: (msg, argumets, text ) => {
        const Discord = require('discord.js');
        const bot = new Discord.Client();
        const fs = require('fs');

        if(msg.mentions.members.first()) 
        {
            membroInvitatoID = msg.mentions.members.first().id;

            var data = JSON.parse(fs.readFileSync('./canaliPrivati.json'));
            console.log(data);
            NStanze = data.Stanze.length;
            console.log(NStanze);

            for (var i = 0; i<NStanze; i++)
            {   
                NUtenti = data.Stanze[i].utenti.length;
                console.log("numero utenti " +NUtenti)
                
                    let esiste = data.Stanze[i].utenti.includes(msg.author.id);
                    console.log("esiste: " + esiste);
                    if(esiste)
                    {
                        data.Stanze[i].utenti.push(membroInvitatoID);

                        var nuovoUtente = JSON.stringify(data);

                        fs.writeFile('./canaliPrivati.json', nuovoUtente, (err) => {
                            if (err) throw err;
                            console.log('Utente aggiunto');
                        });
                    }
                
            }    
        }

        //message.mentions.members.first().roles.some(r=> [RSR, RC, RSD, RGB].includes(r.name)) 
    },
    
    requiredRoles: [],
    premission: []
}