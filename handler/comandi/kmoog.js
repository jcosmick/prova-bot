module.exports ={
    commands: 'kmo',
    minArgs: 0,
    cancellaMessaggio: true,
    callback: (msg, argumets, text ) => {
         switch (Math.floor(Math.random() * 3)){
            case 0:
                msg.channel.send({ files: ["./meme/memes_out.mp4"] });
            break;
            case 1:
                msg.channel.send({ files: ["./meme/melody_meme.mp4"] });
            break;
            default:
                msg.channel.send({ files: ["./meme/scatman.mp4"] });
            break;
        }
    },
    chiutilizza: ['301837981872816129', '145522053733154816'],
}