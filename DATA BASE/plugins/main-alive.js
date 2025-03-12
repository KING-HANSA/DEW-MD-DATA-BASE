const {readEnv} = require('../lib/database')
const { cmd } = require("../command")
const os = require("os")
const { runtime } = require('../lib/functions')

cmd(
  {
    pattern: "alive",
    alias: ["status"],
    desc: "Check if the bot is alive",
    category: "main",
    react: "👨‍💻",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    { from, pushname, reply }
  ) => {
    try {
      const config = await readEnv();
      // Get current hour
      let currentHour = new Date().getHours();
      let greeting;

      // Set greeting based on correct time periods
      if (currentHour >= 5 && currentHour < 12) {
        greeting = "🌅 *Good Morning!*";
      } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "🌞 *Good Afternoon!*";
      } else if (currentHour >= 17 && currentHour < 20) {
        greeting = "🌆 *Good Evening!*";
      } else {
        greeting = "🌙 *Good Night!*";
      }

      let aliveText = `${greeting}
> 👋 Hi ${pushname} I'm alive now

╭━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁
┃ Runtime* :: ${runtime(process.uptime())}
┃ Ram* :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
┃ Prefix* :: ${config.PREFIX}
╰━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁*⦁ 
  
╭━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁
> Hello , I am alive now!!
╰━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁*⦁    

> Github Repo ${config.REPO_LINK}

*${config.COPYRIGHT}*`;

      // Send the alive message
      await conn.sendMessage(
        from,
        {
          text: aliveText,
          contextInfo: {
            externalAdReply: {
              title: "DEW-MD",
              body: "© Powered by Hansa Dewmina",
              thumbnailUrl: "https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png",
              sourceUrl: "https://whatsapp.com/channel/0029Vb2bFCq0LKZGEl4xEe2G",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );

      console.log(`✅ Alive command used in: ${from}`);
    } catch (e) {
      console.error("Alive Command Error:", e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
