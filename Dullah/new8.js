const { dullah } = require("../Aslam/dullah");
const axios = require("axios");

// 🐶 Dog Command
dullah(
  {
    nomCom: "dog",
    categorie: "fun",
    reaction: "🐶",
    desc: "Fetch a random dog image."
  },
  async (dest, zk, commandOptions) => {
    const { repondre } = commandOptions;
    try {
      const apiUrl = `https://dog.ceo/api/breeds/image/random`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      await zk.sendMessage(dest, {
        image: { url: data.message },
        caption: "🐕 RANDOM DOG IMAGE 🐕\n\n> ©aslam max is Speed🤎"
      });
    } catch (e) {
      console.error("Dog command error:", e);
      repondre(`❌ Error fetching dog image: ${e.message}`);
    }
  }
);

// 🐱 Cat Command
dullah(
  {
    nomCom: "cat",
    categorie: "fun",
    reaction: "🐱",
    desc: "Fetch a random cat image."
  },
  async (dest, zk, commandOptions) => {
    const { repondre } = commandOptions;
    try {
      const apiUrl = `https://api.thecatapi.com/v1/images/search`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      await zk.sendMessage(dest, {
        image: { url: data[0].url },
        caption: "🐈 RANDOM CAT IMAGE 🐈\n\n> ©aslam max is Speed🤎"
      });
    } catch (e) {
      console.error("Cat command error:", e);
      repondre(`❌ Error fetching cat image: ${e.message}`);
    }
  }
);
