module.exports = {
    commands: ['c', 'code', 'codice'],
    exectedArgs: '<Codice>',
    minArgs: 1,
    cancellaMessaggio : true,
    callback: (msg, args, text) => {
      if(text.length>0)
      {
        if(!msg.mentions.members.first()) //messaggio senza menzione
        {
          
          msg.channel.send('```' + text + '```');    //invia il messaggio versione codice
        }
        else                             //messaggio  CON menzione
        {
          text = text.substring(args[0].length+1)
          msg.mentions.members.first().send('```' + text + '```');
        }
      }
  }
}