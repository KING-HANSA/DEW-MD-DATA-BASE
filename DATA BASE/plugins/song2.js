/*const {readEnv} = require('../lib/database')
const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

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

  const data = search.videos[0];  
  const url = data.url;  

  // Song metadata description  
  let desc = `
◈ 𝐀𝐔𝐃𝐈𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑

◈=======================◈
╭──────────────╮
┃ 🎵 𝙏𝙞𝙩𝙡𝙚 : ${data.title}
┃
┃ ⏱ 𝘿𝙪𝙧𝙖𝙩𝙞𝙤𝙣 : ${data.timestamp}
┃
┃ 📅 𝙍𝙚𝙡𝙚𝙖𝙨𝙚 : ${data.ago}
┃
┃ 📊 𝙑𝙞𝙚𝙬𝙨 : ${data.views}
┃
┃ 🔗 𝙇𝙞𝙣𝙠 : ${data.url}
┃
╰──────────────╯
⦁⦂⦁*━┉━┉━┉━┉━┉━┉━┉━⦁⦂⦁

> 🔢 Reply below number

1 │❯❯◦ Audio File 🎶
2 │❯❯◦ Document File 📂
3 │❯❯◦ Voice Note 🎤

*${config.COPYRIGHT}*
`;
const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

// Send externalAdReply with views under channel name  
  /*await robin.sendMessage(  
    from,  
    {  
      text: desc,  
      contextInfo: {  
        externalAdReply: {  
          title: "DEW-MD",  
          body: `👀 Views: ${data.views}`, // Views count below the channel name  
          thumbnail: { url: data.thumbnail },  
          sourceUrl: "https://whatsapp.com/channel/0029Vb2bFCq0LKZGEl4xEe2G",  
          mediaType: 1,  
          renderLargerThumbnail: true,  
        },  
      },  
    },  
    { quoted: mek }  
  );*/  

  // Send metadata thumbnail message  
/*await robin.sendMessage(  
    from,  
    { image: { url: data.thumbnail }, caption: desc },  
    { quoted: mek }  
  );
  // Download the audio using @vreden/youtube_scraper  
  const quality = "128"; // Default quality  
  const songData = await ytmp3(url, quality);  

  if (!songData || !songData.download || !songData.download.url) {  
    return reply("❌ Failed to download the song!");  
  }  

  // Validate song duration (limit: 30 minutes)  
  let durationParts = data.timestamp.split(":").map(Number);  
  let totalSeconds =  
    durationParts.length === 3  
      ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]  
      : durationParts[0] * 60 + durationParts[1];  

  if (totalSeconds > 1800) {  
    return reply("⏱️ Audio limit is 30 minutes!");  
  }  

//////////////////////////////////
conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                     // Send audio file  
  await conn.sendMessage(  
    from,  
    {  
      audio: { url: songData.download.url },  
      mimetype: "audio/mpeg",  
    },  
    { quoted: mek }  
  );      
                    break;
                    case '2':
                    // Send as a document  
  await conn.sendMessage(  
    from,  
    {  
      document: { url: songData.download.url },  
      mimetype: "audio/mpeg",  
      fileName: `${data.title}.mp3`,  
      caption: "> *㋛ DEW-MD BY HANSA DEWMINA*",  
    },  
    { quoted: mek }  
  );                              
                    break;
                    case '3':
                     // Send audio file  
 await conn.sendMessage(
            from,
            {
                audio: { url: songData.download.url },
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
});*/
