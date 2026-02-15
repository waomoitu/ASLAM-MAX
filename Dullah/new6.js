const { dullah } = require("../Aslam/dullah");
const getFBInfo = require("@xaviabot/fb-downloader"); 

dullah({
  nomCom: "fb",
  aliases: ["fbdl", "facebookdl", "fb1"],
  categorie: "Download",
  reaction: "📽️",
  desc: "Download Facebook videos"
}, async (dest, zk, { repondre, ms, arg }) => {
  if (!arg[0]) {
    return repondre("⚠️ Please provide a Facebook video link!");
  }

  const url = arg[0];
  try {
    const result = await getFBInfo(url);

    if (!result || (!result.sd && !result.hd)) {
      return repondre("❌ Could not fetch the video. Try another FB link.");
    }

    // Send thumbnail and title
    await zk.sendMessage(dest, {
      image: { url: result.thumbnail },
      caption: `*Title:* ${result.title || "Facebook Video"}`
    }, { quoted: ms });

    // Send video (HD if available, otherwise SD)
    await zk.sendMessage(dest, {
      video: { url: result.hd || result.sd },
      caption: "> ©Aslam max is Speed🔥"
    }, { quoted: ms });

    // Send channel forward message
    const message = "✅ Successfully downloaded via Dullahxmd";
    await zk.sendMessage(dest, {
      text: message,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363402252728845@newsletter",
          newsletterName: "aslam max",
          serverMessageId: -1
        }
      }
    }, { quoted: ms });

  } catch (e) {
    console.error("FB download error:", e);
    repondre("⚠️ Error while downloading the Facebook video: " + e.message);
  }
});
