const {readEnv} = require('../lib/database')
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "apk",
    alias: ["app"],
    react: "📲",
    desc: "Download Apk",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv();
        if (!q) return reply("Please Provide A Name To Apk");

        const res = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(q)}`);
        const data = await res.json();
        
        if (!data.success) return reply("Faild To Download Apk");

        let desc = `「 𝗔𝗣𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 」
╭──📦 APK Details 📦──◦•◦❥•
╎
╎ 🏷 Nᴀᴍᴇ : ${data.apk_name}
╎
╰───────────────◦•◦❥•
⦁⦂⦁━┉━┉━┉━┉━┉━┉━┉━⦁⦂⦁

🔢 Reply below number

*[1] Download File* 📥
   1.1 │❯❯◦ Apk File 📂
   1.2 │❯❯◦ XApk File 📂

*${config.COPYRIGHT}*`;

const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });  

conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg.message || !msg.message.extendedTextMessage) return;

    const selectedOption = msg.message.extendedTextMessage.text.trim();

    if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
        switch (selectedOption) {
            case '1.1':;
            const config1 = await readEnv();
                await conn.sendMessage(from, { document: { url: data.download_link }, mimetype: "application/vnd.android.package-archive", fileName: `『 ${data.apk_name} 』.apk`, caption: `*${config1.COPYRIGHT}*` }, { quoted: mek });
                break;
            case '1.2':;
            const config2 = await readEnv();
                await conn.sendMessage(from, { document: { url: data.download_link }, mimetype: "application/vnd.android.package-archive", fileName: `『 ${data.apk_name} 』.apk`, caption: `*${config2.COPYRIGHT}*` }, { quoted: mek });
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
