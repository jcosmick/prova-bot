module.exports ={
    commands: ["classifica", "cla"],
    exectedArgs: [],
    permissionError: 'errore',
    minArgs: 0,
    //maxArgs: 2,
    callback: (msg, args, text ) => {
        const Discord = require('discord.js');
        const fs = require('fs');
        var monaGiorno = JSON.parse(fs.readFileSync('./MonaGiorno.json'));
        var nomi;
        
    
    

        monaGiorno.mona.sort((a, b) => parseFloat(b.premi) - parseFloat(a.premi));

    console.log(monaGiorno.mona)

    var senzaZero = [];
    for(var i = 0; i<monaGiorno.mona.length; i++)
    {
       if(monaGiorno.mona[i].premi > 0)
       {
           senzaZero.push(monaGiorno.mona[i])
       }

    }
    

    var Classifica= "Classifica aggiornata: \n";
    for(var i = 0; i<senzaZero.length; i++)
    {
        Classifica += ( JSON.stringify(senzaZero[i].nome)+": " + JSON.stringify(senzaZero[i].premi)+ "\n")
    }
    msg.channel.send(Classifica)

    },
    chiutilizza: ['301837981872816129', '145522053733254816', '423737939802193921', '418380772232134666' ],
    requiredRoles: [],
    premission: []
}