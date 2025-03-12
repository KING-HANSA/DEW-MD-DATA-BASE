const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "repo",
    desc: "repo the bot",
    react: "📡",
    category: "main",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let dec = `> DEW-MD REPO INFO 🪀

╭⦁⦂⦁*━┉━┉━┉━┉━┉━┉━⦁⦂⦁
┃ 𝙾𝚆𝙽𝙴𝚁 𝙽𝚄𝙼𝙱𝙴𝚁: ${config.OWNER_NUMBER}
┃ 
┃ DEW-MD REPO: ${config.REPO_LINK} 
┃
┃ BOT UPDATES: ${config.WA_CHANNEL}
╰⦁⦂⦁*━┉━┉━┉━┉━┉━┉━⦁⦂⦁

*© POWERD BY HANSA DEWMINA*
`
await conn.sendMessage(from,{image:{url: config.ALIVE_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
