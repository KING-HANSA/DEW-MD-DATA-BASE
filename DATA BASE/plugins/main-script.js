const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "script",
    alias: ["sc","repo","info"],
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let repo =`
*╭──────────────●●►*
> *BOT OWNER:*
*|* *Hansa Dewmina*

> *DEW-MD REPO:*
*|* *https://github.com/KING-HANSA/DEW-MD-LITE*

> *SUPPORT CHANNEL:*
*|* *https://whatsapp.com/channel/0029Varwcfc7YSd60AulNF2h*
*╰──────────────●●►*

> *update command Done*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '12036323288171807@newsletter',
      newsletterName: "UMAR",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'DEW-MD',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/KING-HANSA/DEW-MD-LITE" ,
thumbnailUrl: "https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});
