const moment = require("moment-timezone");
const { dullah } = require(__dirname + "/../Aslam/dullah");
const axios = require("axios");

const repository = "aslam-max/ASLAM-MAX";
const imageUrl = "https://url.bwmxmd.online/Dullah.fwzxhzl7.jpg";

const githubRawBaseUrl =
  "https://raw.githubusercontent.com/aslammax/bwm-xmd-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 100 }, (_, i) => `sound${i + 1}.mp3`);

const formatNumber = (num) => num.toLocaleString();

const fetchRepoDetails = async () => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repository}`);
    const { stargazers_count, forks_count } = response.data;

    return {
      stars: stargazers_count * 2,
      forks: forks_count * 2,
    };
  } catch (error) {
    console.error("Error fetching GitHub repository details:", error);
    return null;
  }
};

const commands = ["git", "repo", "script", "sc"];

commands.forEach((command) => {
  dullah({ nomCom: command, categorie: "🚀 GitHub" }, async (dest, zk, commandeOptions) => {
    let { repondre } = commandeOptions;
    const repoDetails = await fetchRepoDetails();

    if (!repoDetails) {
      repondre("❌ Failed to fetch GitHub repository information.");
      return;
    }

    const { stars, forks } = repoDetails;
    const currentTime = moment().tz("Africa/Nairobi").format("DD/MM/YYYY HH:mm:ss");

    const infoMessage = `╭━===========================
┃  📌 WHATSAPP BOT REPO INFO 📌
┃ ⭐ Total Stars: ${formatNumber(stars)}
┃ 🍴 Total Forks: ${formatNumber(forks)}
┃ 👤 Owner: Aslam max
┃ 🕰 Updated: ${currentTime}
╰━===========================

🔹 Reply with a number to choose an action:
1️⃣ Open GitHub Repo 🌍
2️⃣ Open WhatsApp Channel 📢
3️⃣ Ping Bot 📡
4️⃣ Repo Alive Audio 🔊

> Sir dullah
`;

    try {
      const sentMessage = await zk.sendMessage(dest, {
        text: infoMessage,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363402252728845@newsletter",
            newsletterName: "Dullah xmd",
            serverMessageId: Math.floor(100000 + Math.random() * 900000),
          },
          externalAdReply: {
            title: "🚀 Explore whatsapp bot Updates!",
            body: "Reply this message with 1 to get repo link.",
            thumbnailUrl: imageUrl,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            mediaUrl: "whatsapp.com/channel/0029VbBFf4nEgGfS6bViYQ1O",
            sourceUrl: "whatsapp.com/channel/0029VbBFf4nEgGfS6bViYQ1O",
          },
        },
      });

      // Listen for Reply
      zk.ev.on("messages.upsert", async (update) => {
        const message = update.messages[0];
        if (!message.message || !message.message.extendedTextMessage) return;

        const responseText = message.message.extendedTextMessage.text.trim();
        if (
          message.message.extendedTextMessage.contextInfo &&
          message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id
        ) {
          if (responseText === "1") {
            await zk.sendMessage(dest, { text: "🌍 Opening GitHub Repository..." });
            await zk.sendMessage(dest, { text: `Numbers reply repo\ngithub.com/${repository}` });
          } else if (responseText === "2") {
            await zk.sendMessage(dest, { text: "📢 Opening WhatsApp Channel..." });
            await zk.sendMessage(dest, { text: "whatsapp.com/channel/0029VbBFf4nEgGfS6bViYQ1O" });
          } else if (responseText === "3") {
            const randomPong = Math.floor(Math.random() * 900000) + 100000;
            await zk.sendMessage(dest, { text: `*Ping Testing...*\n\n*📡 Pong! ${randomPong} ✅*` });
          } else if (responseText === "4") {
            const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
            const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;
            await zk.sendMessage(dest, {
              audio: { url: audioUrl },
              mimetype: "audio/mpeg",
              ptt: true,
              contextInfo: {
                mentionedJid: [dest],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "120363402252728845@newsletter",
                  newsletterName: "Dullah xmd",
                  serverMessageId: Math.floor(100000 + Math.random() * 900000),
                },
                externalAdReply: {
                  title: "🎵 Alsam md Repo Alive Audio",
                  body: "Enjoy this random alive audio!",
                  thumbnailUrl: imageUrl,
                  mediaType: 1,
                  showAdAttribution: true,
                  renderLargerThumbnail: false,
                },
              },
            });
          } else {
            await zk.sendMessage(dest, { text: "❌ Invalid choice. Please reply with 1, 2, 3, or 4." });
          }
        }
      });
    } catch (e) {
      console.error("❌ Error sending GitHub info:", e);
      repondre("❌ Error sending GitHub info: " + e.message);
    }
  });
});
