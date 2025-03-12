const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const yts = require('yt-search');
const fg = require('api-dylux');
const config = require('../config');

// -------- Video Download --------
cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "📽️",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv();
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const deta = search.videos[0];
        const url = deta.url;

        let desc = `◈ 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑

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

🔢 Reply below number

*[1] Video File* 🎶
   1.1 │❯❯◦ 360 File 🎶
   1.2 │❯❯◦ 480 File 🎶
   1.3 │❯❯◦ 720 File 🎶
   1.4 │❯❯◦ 1080 File 🎶

*[2] Document File* 📂
   2.1 │❯❯◦ 360 File 📂
   2.2 │❯❯◦ 480 File 📂
   2.3 │❯❯◦ 720 File 📂
   2.4 │❯❯◦ 1080 File 📂


*${config.COPYRIGHT}*`;

        const vv = await conn.sendMessage(from, { image: { url: deta.thumbnail }, caption: desc }, { quoted: mek });
        const res = await fetch(`https://apis.davidcyriltech.my.id/download/ytmp4?url=${url}`);
        const data = await res.json();
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrl = data.result.download_url;
                        await conn.sendMessage(from,{video:{url:downloadUrl},mimetype:"video/mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '1.2':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrll = data.result.download_url;
                        await conn.sendMessage(from,{video:{url:downloadUrll},mimetype:"video/mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '1.3':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrlll = data.result.download_url;
                        await conn.sendMessage(from,{video:{url:downloadUrlll},mimetype:"video/mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '1.4':;
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrllll = data.result.download_url;
                        await conn.sendMessage(from,{video:{url:downloadUrllll},mimetype:"video/mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;    
                    case '2.1':
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrrl = data.result.download_url;
                        await conn.sendMessage(from,{document:{url:downloadUrrl},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '2.2':
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrrll = data.result.download_url;
                        await conn.sendMessage(from,{document:{url:downloadUrrll},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '2.3':
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrrrlll = data.result.download_url;
                        await conn.sendMessage(from,{document:{url:downloadUrrrlll},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
                        break;
                    case '2.4':
                        if (!data.success) return reply("*Download Failed* Please Try Again");
                        let downloadUrrrrlllll = data.result.download_url;
                        await conn.sendMessage(from,{document:{url:downloadUrrrrlllll},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"*㋛ DEW-MD BY HANSA DEWMINA*"},{quoted:mek})
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
