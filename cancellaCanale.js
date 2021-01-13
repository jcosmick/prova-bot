const fs = require('fs')
var canaliNome = []
  

module.exports = client => {
    client.on('voiceStateUpdate', (oldState, newState) => 
    {   
        //riapre il file
        var data = JSON.parse(fs.readFileSync('./canaliPrivati.json'));
        
        //Controlla tutte le stanze e crea il file con i nomi  
        for(var i=0; i<data.Stanze.length; i++)
        {  
        //Controlla se la stanza contiene un null
            if (data.Stanze[i] === null)
            {   
                console.log("TROVATO NULL posizione: " + i)

                //rimuove null
                data.Stanze = data.Stanze.filter(x => x !== null)
                console.log(data.Stanze);

                //riscrive il file
                var json = JSON.stringify(data)
                fs.writeFile('./canaliPrivati.json', json, (err) => {
                    if (err) throw err;
                    console.log('Null Eliminato');
                    });
            }  
        //se non contiene null scrivo il nome all'interno della variabile
            else
            {
                canaliNome[i] = data.Stanze[i].nome[0];
                console.log("Stanze private:" + canaliNome[i]);
            }
        }  
        console.log(data)
        

        

        const { guild } = oldState;
        const joined = !!newState.channelID;

        const canaleID = joined ? newState.channelID : oldState.channelID;
        const canale = guild.channels.cache.get(canaleID);
        const canaleNome = canale.name;

        
        //Quando un utente quitta
        if(!joined)
        {   
            console.log('canale quit: ' + canaleNome);
            console.log('canale quit id: ' + canaleID);

            if (oldState.channelID) 
            {
                var channel = guild.channels.cache.get(oldState.channelID)

                //Controlla se il canale è vuoto ed è contenuto all'interno del JSON
                if (canaliNome.includes(channel.name) && channel.members.size === 0 )
                {   
                    //Lo elimina
                    channel.delete()

                    //Elimina il suo contenuto dal json
                    for(var i=0; i<data.Stanze.length; i++)
                    {
                        if(data.Stanze[i].nome[0] == channel.name)
                        {
                            console.log("Stanza trovata")
                            delete data.Stanze[i]
                            data.Stanze = data.Stanze.filter(x => x !== null)
                            //Se non ci sono più stanze cancello la categoria
                            if(data.Stanze.length == 0)
                            {   
                                var categoria =  guild.channels.cache.get(data.IDCategoria)
                                categoria.delete();
                                delete data.IDCategoria
                                console.log("Non ci sono stanze, categoria cancellata")
                            }
                            var json = JSON.stringify(data)
                            fs.writeFile('./canaliPrivati.json', json, (err) => {
                                if (err) throw err;
                                console.log('Stanza Cancellata');
                                });
                        }
                        else console.log("Stanza non trovata")
                    }
                }
            }
        }
        //Quando un utente joina
        if(joined)
        {   
            //Il canale in cui l'utente ha joinato
            var channel = guild.channels.cache.get(newState.channelID)
            console.log("qualcuno ha joinato un canale")
            for(var i=0; i<data.Stanze.length; i++)
            {
                //controllo se il nome del canale è una stanza privata
                if(channel.name == data.Stanze[i].nome[0])
                {
                    //controllo se l'utente è invitato all'interno di quella stanza
                    for (var j=0; j<data.Stanze[i].utenti.length; j++)
                    {   
                        //Se l'utente è invitato entra
                        if(data.Stanze[i].utenti[j] == newState.id)
                        {   
                            console.log(data.Stanze[i].utenti[j])
                            console.log("membro accettato")
                            return 0;
                            
                        }
                        
                    }
                    //Se l'utente non viene rilevato viene kickato
                    console.log("il membro non è stato invitato nella stanza: " + data.Stanze[i].nome[0])
                    newState.kick()
                    return 0;
                }
            }
            

        }
    })

}