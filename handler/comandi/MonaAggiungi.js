module.exports ={
    commands: ["mona", "aggiungi", "agg"],
    exectedArgs: [],
    permissionError: 'errore',
    minArgs: 1,
    //maxArgs: 2,
    callback: (msg, args, text ) => {
        const Discord = require('discord.js');
        const fs = require('fs');
        var monaGiorno = JSON.parse(fs.readFileSync('./MonaGiorno.json'));

    
    console.log(args[0])
    for(var i=0; i<monaGiorno.mona.length; i++)
    {
        
        if(monaGiorno.mona[i].nome == args[0])
        {
            monaGiorno.mona[i].premi += 1;
            console.log("mona trovato in posizione" + i)
            break;
        }
        else
        {
            console.log("nome non trovato in posizione "+i);
        }
    }
    
    var nuovoMona= JSON.stringify(monaGiorno);
    fs.writeFile('./MonaGiorno.json', nuovoMona, (err) => {
        if (err) throw err;
        console.log('Mona salvato');
    });

    },
    chiutilizza: ['301837981872816129', '145522053733254816', '423737939802193921', '418380772232134666' ],
    requiredRoles: [],
    premission: []
}









