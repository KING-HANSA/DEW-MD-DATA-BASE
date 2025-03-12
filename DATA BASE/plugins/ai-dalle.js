const {readEnv} = require('../lib/database')
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "dalle",
    desc: "Generate an AI image",
    category: "main",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, {
    args,
    q,
    reply
}) => {
    try {
        const config = await readEnv();
        // Ensure there is a prompt
        let prompt = args.join(" ");
        if (!prompt) {
            return reply("Please provide a prompt for the AI image.");
        }

        // Fetch image from the API
        let imageUrl = `https://apis.davidcyriltech.my.id/diffusion?prompt=${encodeURIComponent(prompt)}`;

        // Send the image
        return conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `"${prompt}"\n*${config.COPYRIGHT}*` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message || e}`);
    }
});
