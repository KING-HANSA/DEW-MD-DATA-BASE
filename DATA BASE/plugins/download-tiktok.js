const {readEnv} = require('../lib/database')
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tt",
    alias: ["tiktok"],
    react: "🎬",
    desc: "Download TikTok video using the provided URL",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const config = await readEnv();
        // Check if URL is provided
        if (!args[0]) {
            return await reply("*Give Me A Tik Tok Link.*");
        }

        const tiktokUrl = args[0];
        const apiUrl = `https://manul-official-api.vercel.app/scrape-tiktok?url=${encodeURIComponent(tiktokUrl)}&apikey=Manul-Official`;

        // Send request to the API
        const response = await axios.get(apiUrl);

        // Check if the response is successful
        if (response.data.status) {
            const data = response.data.data.data;

            // Prepare the message with video details and options
            const message = `
◈ 𝐓𝐈𝐊 𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 

◈=======================◈
╭──────────────╮
┃ 🎵 𝙏𝙞𝙩𝙡𝙚 : ${data.title}
┃
┃ 👤 𝙊𝙪𝙩𝙝𝙤𝙧 : ${data.author}
┃
╰──────────────╯
⦁⦂⦁*━┉━┉━┉━┉━┉━┉━┉━⦁⦂⦁

> 🔢 Reply below number

1 │❯❯◦ No Watermark Video 🎶
2 │❯❯◦ Watermark Video 📂
3 │❯❯◦ MP3 (Audio)
4 │❯❯◦ Thumbnail

*${config.COPYRIGHT}*`;

            // Send the message and save the message ID
            const sentMsg = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: message }, { quoted: mek });
            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply
                    await conn.sendMessage(from, {
                        react: { text: "🌟", key: mek.key },
                    });

                    switch (messageType) {
                        case '1':
                            // Handle option 1 (No Watermark Video)
                            await conn.sendMessage(
                                from,
                                { video: { url: data.nowm }, caption: "*㋛ DEW-MD BY HANSA DEWMINA*" },
                                { quoted: mek }
                            );
                            break;
                        case '2':
                            // Handle option 2 (Watermark Video)
                            await conn.sendMessage(
                                from,
                                { video: { url: data.watermark }, caption: "*㋛ DEW-MD BY HANSA DEWMINA*" },
                                { quoted: mek }
                            );
                            break;
                        case '3':
                            // Handle option 3 (Audio)
                            await conn.sendMessage(
                                from,
                                { audio: { url: data.audio }, mimetype: 'audio/mp4', caption: "*㋛ DEW-MD BY HANSA DEWMINA*" },
                                { quoted: mek }
                            );
                            break;
                        case '4':
                            // Handle option 4 (Thumbnail)
                            await conn.sendMessage(
                                from,
                                { image: { url: data.thumbnail }, caption: "*㋛ DEW-MD BY HANSA DEWMINA*" },
                                { quoted: mek }
                            );
                            break;
                        default:
                            // Handle invalid input (not 1, 2, 3, or 4)
                            await conn.sendMessage(from, {
                                react: { text: "❓", key: mek.key },
                            });
                            await reply("Reply A 1-4 Numbers To Get...");
                            break;
                    }

                    // React to the successful completion of the task
                    await conn.sendMessage(from, {
                        react: { text: "✅", key: mek.key },
                    });

                    // Clear the stored TikTok data
                    delete conn.tiktokData;
                }
            });
        } else {
            await reply("*Invalid Url*");
        }
    } catch (error) {
        console.error("Error fetching TikTok video:", error);

    }
});
