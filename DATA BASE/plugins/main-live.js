const hrs = new Date().getHours({ timeZone: 'Asia/Colombo' })
const {cmd , commands} = require('../command')
const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const util = require('util');
const axios = require('axios');
const { config } = require('process');
const {readEnv} = require('../lib/database')

//---------------------------------------------------------------------------
cmd({
            pattern: "live",
            alias: ["time"],
            desc: "Show Live Time Of Sri Lanka",
            category: "fun",
	          filename: __filename,
            use: '<group link.>',
        },
        async(Void, citel, text,{ isCreator }) => {
var time = new Date().toLocaleString('HI', { timeZone: 'Asia/Colombo' }).split(' ')[1]
var date = new Date().toLocaleDateString(get_localized_date)
var wish = ''
if (hrs < 12) wish = 'ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ ⛅'
if (hrs >= 12 && hrs <= 16) wish = 'ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ 🌞'
if (hrs >= 16 && hrs <= 20) wish = 'ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌥'
if (hrs >= 20 && hrs <= 24) wish = 'ɢᴏᴏᴅ ɴɪɢʜᴛ 🌙'
var am_pm = ''
if (hrs < 12) am_pm = 'ᴀᴍ'
if (hrs >= 12 && hrs <= 24) am_pm = 'ᴘᴍ'
const config = await readEnv();
const hansa= [777,0,100,500,1000,999,2021]
const q = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
        "orderMessage": {
           "itemCount" : hansa[Math.floor(8*Math.random())],
           "status": 1,
           "surface" : 1,
           "message": `❏➬ © DEW - MD`,
           "orderTitle": "alive",
           "sellerJid": '94759554531@s.whatsapp.net' 
        }
      }
}

let timenow =`
╭━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁
┃    *${wish}* 
┃ *ᴛɪᴍᴇ* ⌚ ${time} ${am_pm}
┃ *Date* 🎲 ${date}   
╰━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁*⦁

*${config.COPYRIGHT}*`
return await Void.sendMessage(citel.chat, { text:timenow }, { quoted : q } )
  
  
})
