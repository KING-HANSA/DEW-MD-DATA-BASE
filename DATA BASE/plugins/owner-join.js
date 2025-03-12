const config = require('../config')
const { cmd, commands } = require('../command')
      cmd({ 
           pattern: "join",
            desc: "joins group by link",
            category: "owner",
            use: '<group link.>',
        },
       async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isSadas && !isMani && !isMe)return;
    try{  if (!q) return reply(`Please give me Query`);
            if (!q.split(" ")[0] && !q.split(" ")[0].includes("whatsapp.com"))
               reply("Link Invalid, Please Send a valid whatsapp Group Link!");
            let result = q.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await conn.groupAcceptInvite(result)
                .then((res) => reply("You Are Joined Group"))
                .catch((err) => reply("Error in Joining Group"));
} catch (e) {
reply('*Error !!*')
l(e)
}
})
