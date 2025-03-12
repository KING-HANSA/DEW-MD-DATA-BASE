const { cmd } = require('../command');

cmd({
    pattern: "anticallon",
    alias: ["blockcall"],
    desc: "Reject incoming WhatsApp calls automatically.",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        conn.ev.on('call', async (callUpdate) => {
            try {
                // Check for incoming call
                if (callUpdate.type === 'offer') {
                    const callerId = callUpdate.from; // Get caller's number
                    
                    // Reject the call
                    await conn.rejectIncomingCall(callUpdate.id); // Main call rejection

                    // Block the caller (optional)
                    await conn.updateBlockStatus(callerId, "block");

                    // Notify the caller (optional)
                    await conn.sendMessage(callerId, {
                        text: "I don't accept WhatsApp calls. Please send a message instead.",
                    });

                    console.log(`Call from ${callerId} has been rejected and blocked.`);
                }
            } catch (err) {
                console.error('Error rejecting call:', err);
            }
        });

        reply("Anti-call feature has been activated.");
    } catch (e) {
        console.error('Error setting up anti-call feature:', e);
        reply(`${e}`);
    }
});
