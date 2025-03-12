const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command');
const { igdl } = require('ruhend-scraper');

cmd({
    pattern: "fb",
    desc: "To download facebook videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const config = await readEnv(); 
  
  if (!args[0]) {
    return reply('*`Please give a waild Facebook link`*');
  }

  await m.react('🕒');
  let res;
  try {
    res = await igdl(args[0]);
  } catch (error) {
    return reply('*`Error obtaining data.`*');
  }
let desc = `
◈ 𝐅𝐁 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑

◈=======================◈

> 🔢 Reply below number
 
1 │❯❯◦ Download FB Video In HD
2 │❯❯◦ Download FB Video In SD
  
  *${config.COPYRIGHT}*`;
  const vv = await conn.sendMessage(from, { image: { url: config.ALIVE_IMG}, caption: desc }, { quoted: mek });

  let result = res.data;
  if (!result || result.length === 0) {
    return reply('*`No resalt found.`*');
  }
  

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (error) {
    return reply('*`Error data loss.`*');
  }

  if (!data) {
    return reply('*`No data found.`*');
  }

  //await m.react('✅');
  let video = data.url;
  let dev = '*㋛ DEW-MD BY HANSA DEWMINA*'
  
  try {
    //await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
  } catch (error) {
    return reply('*`Error download video.`*');
  await m.react('❌');
  }
  conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;

    const selectedOption = msg.message.extendedTextMessage.text.trim();

    if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
        switch (selectedOption) {
            case '1':
                await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
                await m.react('✅');
                break;
            case '2':               
                await conn.sendMessage(m.chat, { video: { url: video }, caption: dev, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
                await m.react('✅');
                break;
            default:
                reply("Invalid option. Please select a valid option🔴");
        }

    }
});

}catch(e){
console.log(e)
  reply(`${e}`)
}
});
