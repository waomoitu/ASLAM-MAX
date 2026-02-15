
const { dullah } = require("../Aslam/dullah");
const axios = require("axios");

// Here we store video data per chatId temporarily (in-memory)
const tikTokCache = new Map();

dullah({
  nomCom: "tiktok",
  aliases: ["tikdl", "tiktokdl"],
  categorie: "Download",
  reaction: "📽️",
  desc: "Download TikTok videos by link"
}, async (dest, zk, commandOptions) => {
  const { reply, arg } = commandOptions;

  if (!arg[0]) return reply('Please insert a public TikTok video link!');
  if (!arg[0].includes('tiktok.com')) return reply("That is not a valid TikTok link.");

  try {
    // Call TikWM API
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(arg[0])}`;
    const { data } = await axios.get(api);

    if (data.code !== 0) {
      return reply("Failed to fetch video. Check the link or try another one.");
    }

    const result = data.data;

    // Store data for this chat so we can use it later when user replies
    tikTokCache.set(dest, result);

    const caption = `
*ASLAM MAX 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐋*
|__________________________|
-᳆ *Title*  
${result.title}
|_________________________
Reply with one of the numbers below:
-᳆ *1* SD quality
-᳆ *2* HD quality
-᳆ *3* Audio only
|__________________________|
`;

    // Send image + caption
    const sentMsg = await zk.sendMessage(dest, {
      image: { url: result.cover },
      caption
    });

    // Immediately send forwarded channel message (the first one)
    await zk.sendMessage(dest, {
      text: "Check out my channel for more updates!",
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363403345479886@newsletter",
          newsletterName: "aslam max 🤎",
          serverMessageId: -1
        }
      }
    });

    // Listen for user replies with numbers
    zk.ev.on("messages.upsert", async (update) => {
      const msg = update.messages[0];
      if (!msg.message) return;
      const chatId = msg.key.remoteJid;

      // Check if reply is to the message with the caption (sentMsg)
      const userText = msg.message.conversation || msg.message.extendedTextMessage?.text;
      const replyTo = msg.message.extendedTextMessage?.contextInfo?.stanzaId;

      if (replyTo !== sentMsg.key.id) return;

      // Retrieve stored video data
      const videoData = tikTokCache.get(chatId);
      if (!videoData) return;

      if (userText === '1') {
        await zk.sendMessage(chatId, {
          video: { url: videoData.play },
          caption: "*ᴅᴜʟʟᴀʜ-xᴍᴅ*"
        }, { quoted: msg });

      } else if (userText === '2') {
        await zk.sendMessage(chatId, {
          video: { url: videoData.hdplay },
          caption: "*ᴅᴜʟʟᴀʜ-xᴍᴅ*"
        }, { quoted: msg });

      } else if (userText === '3') {
        await zk.sendMessage(chatId, {
          audio: { url: videoData.music },
          mimetype: "audio/mpeg"
        }, { quoted: msg });

      } else {
        return reply("Please reply with 1, 2 or 3 only.");
      }

      // After sending video/audio, send channel message again (the second one)
      await zk.sendMessage(chatId, {
        text: "Check out my channel for more updates!",
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363403345479886@newsletter",
            newsletterName: "aslam max 🤎",
            serverMessageId: -1
          }
        }
      }, { quoted: msg });
    });

  } catch (error) {
    console.error(error);
    reply('An error occurred: ' + error.message);
  }
});
