module.exports ={
    commands: 'del',
    permissionError: 'errore',
    minArgs: 0,
    callback: (msg, argumets, text ) => {
        async function wipe() {
            var msg_size = 100;
            while (msg_size == 100) {
                await msg.channel.bulkDelete(100)
            .then(messages => msg_size = messages.size)
            .catch(console.error);
            }
        }
        wipe()
    },
    chiutilizza: ['301837981872816129', '145522053733254816', '222461695833014272' ],
    requiredRoles: [],
    premission: []
}