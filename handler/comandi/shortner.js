global.fetch = require("node-fetch");
module.exports ={
    commands: ['surl', "url"],
    exectedArgs: '<URL>',
    minArgs: 1,
    maxArgs: 2,
    cancellaMessaggio: true,
    callback: (msg, args, text ) => {
      if (!msg.mentions.members.first() && args[0].startsWith("http")) {
        const apiurl = "https://cutt.ly/api/api.php?key=c262efc003e82ddfbb0ab4d752b7c6c6bd70c&short="
        fetch(apiurl + args)
        .then(ris => ris.json())
        .then(api => msg.channel.send(api.url.shortLink) )
      } else if (msg.mentions.members.first()) {
      const apiurl = "https://cutt.ly/api/api.php?key=c262efc003e82ddfbb0ab4d752b7c6c6bd70c&short="
      fetch(apiurl + args[1])
      .then(ris => ris.json())
      .then(api => msg.mentions.members.first().send(api.url.shortLink) )
    }

    },

}