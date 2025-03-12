const { cmd } = require('../command')
const axios = require('axios')  // Axios for making HTTP requests
const { fetchJson } = require('../lib/functions')

// MediaFire download API URL
const mediafireAPI = 'https://api.example.com/download-mediafire?url='; // Replace with actual API URL

cmd({
    pattern: "mfire2",
    desc: "Download MediaFire file.",
    category: "download",
    react: "📥",
    filename: __filename
},
async(conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply('Please provide a MediaFire URL!')

        const fileUrl = q // URL given by the user

        // Call your API to fetch download link
        const response = await axios.get(`${mediafireAPI}${encodeURIComponent(fileUrl)}&apikey=YOUR_API_KEY`)

        // Check if API returns success
        if (response.data.success) {
            const { fileName, downloadUrl } = response.data.data

            let message = `‎‎           
 📥 MEDIAFIRE FILE DOWNLOADER 📥

 📄 File Name: ${fileName}
 📎 Download Link: ${downloadUrl}`
            
            // Send the download link to the user
            await conn.sendMessage(from, { text: message }, { quoted: mek })

            // Send the actual file as a document
            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "application/octet-stream", fileName: fileName }, { quoted: mek })
        } else {
            reply('Sorry, I could not retrieve the file. Please try again later.')
        }

    } catch (e) {
        console.log(e)
        reply('An error occurred while processing the request.')
    }
})
