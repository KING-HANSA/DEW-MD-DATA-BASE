const {readEnv} = require('../lib/database')
const { cmd } = require('../command')
const os = require("os")
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const config = await readEnv();
        let desc = `
🤩 *HELLOW* ${pushname}
> 🪀 WELLCOME TO DEW-MD 🪀

╭──────────────────━┈⊷
│◦ ✗🤖BOT NAME : DEW-MD™
│◦ ✗👤OWNER NAME : HANSA
│◦ ✗☎ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ :
│◦ ✗ 94701515609
│◦ ✗⏰ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
│◦ ✗💾ʀᴀᴍ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◦ ✗💫ᴘʀᴇғɪx : ${config.PREFIX}
╰──────────────────━┈⊷

> 🔢 ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʙᴇʟᴏᴡ🗿

1 │❯❯◦ OWNER MENU
2 │❯❯◦ CONVERT MENU MOVIE MENU
3 │❯❯◦ AI MENU
4 │❯❯◦ SEARCH MENU
5 │❯❯◦ DOWNLOAD MENU
6 │❯❯◦ MAIN MENU
7 │❯❯◦ GROUP MENU
8 │❯❯◦ FUN MENU
9 │❯❯◦ TOOLS MENU
10 │❯❯◦ OTHER MENU


*${config.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: config.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        const config = await readEnv();
                        let response = `*◈ OWNER COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *restart*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.OWNER_IMG }, 
                            caption: response 
                        }, { quoted: mek });
                        break;
                    case '2':
                        let response2 = `*◈ CONVERT COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *convert*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.CONVERT_IMG }, 
                            caption: response2 
                        }, { quoted: mek });
                        break;
                    case '3':
                        let response3 = `*◈ AI COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *ai*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.AI_IMG }, 
                            caption: response3 
                        }, { quoted: mek });
                        break;
                    case '4':
                        let response4 = `*◈ SEARCH COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *yts*
│ • *srepo*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.SEARCH_IMG }, 
                            caption: response4 
                        }, { quoted: mek });
                        break;
                    case '5':
                        
                        response5 = `*◈ DOWNLOAD COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *apk*
│ • *twitter*
│ • *gdrive*
│ • *mediafire*
│ • *fb*
│ • *ig*
│ • *movie*
│ • *song*
│ • *video*
│ • *play/yt*
│ • *song2*
│ • *video2*
│ • *tiktok*
│ • *img*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.DOWNLOAD_IMG }, 
                            caption: response5 
                        }, { quoted: mek });
                        break;
                    case '6':
                        
                        response6 = `*◈ MAIN COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *alive*
│ • *about*
│ • *menu*
│ • *allmenu*
│ • *support*
│ • *system*
│ • *ping*
│ • *runtime*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.MAIN_IMG }, 
                            caption: response6 
                        }, { quoted: mek });
                        break;
                    case '7':
                        
                        response7 = `*◈ GROUP COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *promote*
│ • *demote*
│ • *kick*
│ • *add*
│ • *admins*
│ • *tagall*
│ • *getpic*
│ • *setwelcome*
│ • *setgoodbye*
│ • *gname*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.GROUP_IMG }, 
                            caption: response7 
                        }, { quoted: mek });
                        break;
                    case '8':
                        
                        response8 = `*◈ FUN COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *dog*
│ • *fact*
│ • *hack*
│ • *quote*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.FUN_IMG }, 
                            caption: response8 
                        }, { quoted: mek });
                        break;
                    case '9':
                        
                        response9 = `*◈ TOOLS COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *sticker*
│ • *toimg*
│ • *tomp3*
│ • *qrcode*
│ • *shortlink*
│ • *calc*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.TOOLS_IMG }, 
                            caption: response9 
                        }, { quoted: mek });
                        break;
                    case '10':
                        
                        response10 = `*◈ OTHER COMMAND LIST ◈*
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」
│◈ *RAM USAGE* - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│◈ *RUN TIME* - ${runtime(process.uptime())}
╰──────────●●►
╭────────●●►
│ • *githubstalk*
│ • *trt*
│ • *weather*
╰────────────────────●●►
➠ *Total Commands: 1*
*${config.COPYRIGHT}*`;
                        await conn.sendMessage(from, { 
                            image: { url: config.OTHER_IMG }, 
                            caption: response10 
                        }, { quoted: mek });
                        break;
                    default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
