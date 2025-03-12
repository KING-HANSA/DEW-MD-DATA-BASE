const { cmd } = require('../command'); // Ensure correct path
const { fetchJson } = require('../lib/functions'); // Ensure correct path

const apilink = 'https://www.dark-yasiya-api.site/'; // API LINK (DO NOT CHANGE THIS!!)

cmd({
    pattern: "xvideo",
    alias: ["xvdl", "xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo <text>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("❌ *Please enter a search query!*");

        // Fetch search results
        const xv_list = await fetchJson(`${apilink}/search/xvideo?text=${encodeURIComponent(q)}`).catch(() => null);
        if (!xv_list || !xv_list.result || xv_list.result.length === 0) {
            return await reply("❌ *No results found!*");
        }

        // Fetch video details from the first search result
        const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${encodeURIComponent(xv_list.result[0].url)}`).catch(() => null);
        if (!xv_info || !xv_info.result || !xv_info.result.dl_link) {
            return await reply("❌ *Failed to fetch video details!*");
        }

        // Prepare the message
        const msg = `*乂 SHASNI-MD XVIDEO DOWNLOADER* 🔞

        • *Title* - ${xv_info.result.title || "N/A"}
        • *Views* - ${xv_info.result.views || "N/A"}
        • *Likes* - ${xv_info.result.like || "N/A"}
        • *Dislikes* - ${xv_info.result.deslike || "N/A"}
        • *Size* - ${xv_info.result.size || "N/A"}

        *©ꜱʜᴀꜱɴɪ-ᴍᴅ ᴏꜰ ᴅᴇɴᴜᴡᴀɴ ᴋᴀᴜꜱʜɪᴋᴀ*`;

        // Sending details message
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "SHASNI-MD Xvideo Downloader",
                    body: "Click to view more videos",
                    thumbnailUrl: xv_info.result.image || "",
                    sourceUrl: xv_info.result.url || "",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // Sending video
        await conn.sendMessage(from, {
            video: { url: xv_info.result.dl_link },
            caption: `🎬 *${xv_info.result.title || "Untitled Video"}*\n\n🚀 *Downloaded by SHASNI-MD*`
        }, { quoted: mek });

    } catch (error) {
        console.error("❌ Xvideo Downloader Error:", error);
        reply('❌ *An error occurred while processing your request. Please try again later.*');
    }
});