const {
  sleep
} = require("../lib/functions");
const {
  cmd,
  commands
} = require('../command');
cmd({
  pattern: "alive2",
  alias: ["help"],
  desc: "alive2",
  category: "loading alive",
  react: '👋',
  filename: __filename
}, async (client, message, args, { from, reply }) => {
  try {
    const sentMessage = await client.sendMessage(from, { text: '> *DEW-MD ALIVE*' });
    const heartSequence = ['*Loading . . .*', '*DEW-MD-ALIVE*', '▰▰▰▱▱▱▱▱▱▱▱▱ 10%', '▰▰▰▰▱▱▱▱▱▱▱▱ 20%', '▰▰▰▰▰▱▱▱▱▱▱▱ 30%', '▰▰▰▰▰▰▱▱▱▱▱▱ 40%', '▰▰▰▰▰▰▰▱▱▱▱▱ 50%', '▰▰▰▰▰▰▰▰▱▱▱▱ 60%', '▰▰▰▰▰▰▰▰▰▱▱▱ 70%', '▰▰▰▰▰▰▰▰▰▰▱▱ 80%', '▰▰▰▰▰▰▰▰▰▰▰▱ 90%', '▰▰▰▰▰▰▰▰▰▰▰▰ 100%', '*COMPLETE LOADING* ☘️👋','*ALIVE NOW*', '*HI* 👋 *I AM DEW-MD*\n\n\n* *OWNER NUMBER :* _wa.me/94701515609_\n* *OWNER NAME :* _Hansa Dewmina_\n* *BOT NAME :* _DEW-MD_\n\n> *POWERD BY DEW MD ❀*'];

    for (const heart of heartSequence) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await client.relayMessage(from, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14,
          editedMessage: {
            conversation: heart
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    reply("❌ *Error!* " + error.message);
  }
});
