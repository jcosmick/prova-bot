const { Message } = require("discord.js")

module.exports ={
    commands: ['crea'],
    permissionError: 'errore',
    minArgs: 0,
    //maxArgs: 2,
    callback: (msg, args, text ) => {
        const Discord = require('discord.js');
        const bot = new Discord.Client();
        const fs = require('fs');

        var categoria = msg.guild.channels.cache.find(channel => channel.name == "canaliprivati");
        var canaleDaSalvare, nuovoCanaleID;

        if (categoria == undefined)
        {

            msg.guild.channels.create('canaliprivati', {
                type: 'category',

            }).then(cat => {

                canaleDaSalvare = JSON.parse(fs.readFileSync('./canaliPrivati.json'));

                canaleDaSalvare.IDCategoria = cat.id;
                var nuovaStanza = JSON.stringify(canaleDaSalvare);

                fs.writeFile('./canaliPrivati.json', nuovaStanza, (err) => {
                    if (err) throw err;
                    console.log('Categoria Creata');
                });

                msg.guild.channels.create(text, {
                    type: 'voice',
                    parent: cat.id,
                    }).then(vocale => {
                        nuovoCanaleID = vocale.id;
        
                        canaleDaSalvare = JSON.parse(fs.readFileSync('./canaliPrivati.json'));
        
                        nuovoCanale = {"nome":[text], "id": nuovoCanaleID, "utenti": [msg.author.id]};
                        canaleDaSalvare.Stanze.push(nuovoCanale)
                        
        
                        var nuovaStanza = JSON.stringify(canaleDaSalvare);
        
                        fs.writeFile('./canaliPrivati.json', nuovaStanza, (err) => {
                            if (err) throw err;
                            console.log('Stanza creata');
                        });
                                
                    })
            })
        }
        
        categoria = msg.guild.channels.cache.find(channel => channel.name == "canaliprivati");









        if (categoria != undefined)
        {
          msg.guild.channels.create(text, {
            type: 'voice',
            parent: categoria.id,
            }).then(vocale => {
                nuovoCanaleID = vocale.id;

                canaleDaSalvare = JSON.parse(fs.readFileSync('./canaliPrivati.json'));
                var testo = text;
                nuovoCanale =  {"nome":[text], "id": nuovoCanaleID, "utenti": [msg.author.id]};
                canaleDaSalvare.Stanze.push(nuovoCanale)
                

                var nuovaStanza = JSON.stringify(canaleDaSalvare);

                fs.writeFile('./canaliPrivati.json', nuovaStanza, (err) => {
                    if (err) throw err;
                    console.log('Stanza creata');
                });
                        
            })
        }

        









       
     
    },
    
    requiredRoles: [],
    premission: []
}