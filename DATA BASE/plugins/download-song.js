const {readEnv} = require('../lib/database')
const { cmd, commands } = require("../command");
const yts = require("yt-search");
const fg = require('api-dylux');

cmd(
{
pattern: "song",
alias: "ytmp3", // Add a comma here
react: "🎵",
desc: "Download Song",
category: "download",
filename: __filename,
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
const config = await readEnv();
if (!q) return reply("Please Give Me Text Or Link❓");

// Search for the video  
  const search = await yts(q);  
  if (!search.videos.length) return reply("❌ Video not found!");  

  const deta = search.videos[0];  
  const url = deta.url;  

  // Song metadata description  
  let desc = `
◈ 𝐀𝐔𝐃𝐈𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑

◈=======================◈
╭──────────────╮
┃ 🎵 𝙏𝙞𝙩𝙡𝙚 : ${deta.title}
┃
┃ ⏱ 𝘿𝙪𝙧𝙖𝙩𝙞𝙤𝙣 : ${deta.timestamp}
┃
┃ 📅 𝙍𝙚𝙡𝙚𝙖𝙨𝙚 : ${deta.ago}
┃
┃ 📊 𝙑𝙞𝙚𝙬𝙨 : ${deta.views}
┃
┃ 🔗 𝙇𝙞𝙣𝙠 : ${deta.url}
┃
╰──────────────╯
⦁⦂⦁*━┉━┉━┉━┉━┉━┉━┉━⦁⦂⦁

> 🔢 Reply below number

1 │❯❯◦ Audio File 🎶
2 │❯❯◦ Document File 📂
3 │❯❯◦ Voice Note 🎤

*${config.COPYRIGHT}*
`;
const vv = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
const res = await fetch(`https://apis.davidcyriltech.my.id/download/ytmp3?url=${url}`);
const data = await res.json();
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrl = data.result.download_url;
                         await conn.sendMessage(  
                         from,  
                         {  
                         audio: {url:downloadUrl},  
                         mimetype: "audio/mpeg",  
                         },  
                         { quoted: mek }  
                         );    
                        break;
                    case '2':;
                    if (!data.success) return reply("*Download Failed* Please Try Again");
                    let downloadUrll = data.result.download_url;
                         await conn.sendMessage(  
                         from,  
                         {  
                         document: {url:downloadUrll},  
                         mimetype: "audio/mpeg",  
                         fileName: `${deta.title}.mp3`,  
                         caption: "> *㋛ DEW-MD BY HANSA DEWMINA*",  
                         },  
                         { quoted: mek }  
                         );  
                    case '3':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrlll = data.result.download_url;
                        await conn.sendMessage(
                        from,
                        {
                        audio: {url:downloadUrlll},
                        mimetype: "audio/mpeg",
                        ptt: true, // This makes it a voice note (PTT)
                        },
                       { quoted: mek }
                        );
                        break;
                        default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
