const { dullah } = require("../Aslam/dullah");
const axios = require("axios");

dullah(
  {
    nomCom: "country",
    aliases: ["countryinfo", "cinfo"],
    categorie: "Utility",
    reaction: "🌍",
    desc: "Get complete information about a country including flag, capital, population, driving side, neighbors, and more."
  },
  async (dest, zk, commandOptions) => {
    const { repondre, arg } = commandOptions;

    try {
      const countryName = arg.join(" ");
      if (!countryName) {
        return repondre("*🏷️ Please provide a country name. Example:* `.country Pakistan`");
      }

      // REST Countries API (partial match, avoids fullText issue)
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
      );
      const country = response.data[0];

      if (!country) return repondre("❌ No information found for the specified country. Please try again.");

      // Extract data safely
      const name = country.name.common || "N/A";
      const official = country.name.official || "N/A";
      const capital = country.capital ? country.capital[0] : "N/A";
      const flag = country.flags?.png || country.flags?.svg || "";
      const flagEmoji = country.flag || "";
      const continent = country.region || "N/A";
      const subregion = country.subregion || "N/A";
      const area = country.area || "N/A";
      const population = country.population || "N/A";
      const currency = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
      const languageList = country.languages ? Object.values(country.languages).join(", ") : "N/A";
      const maps = country.maps?.googleMaps || "N/A";
      const iso = country.cca2 + " / " + country.cca3 + " / " + country.ccn3;
      const timezones = country.timezones ? country.timezones.join(", ") : "N/A";
      const borders = country.borders ? country.borders.join(", ") : "No neighboring countries";
      const demonym = country.demonyms?.eng?.m || "N/A";
      const independent = country.independent ? "✅ Yes" : "❌ No";
      const drivingSide = country.car?.side
          ? (country.car.side === "right" ? "Right 🇷🇺" : "Left 🇬🇧")
          : "N/A";
      const famousFor = country.famousFor || "N/A"; // optional, depends on API

      // Format message
      const countryMessage = `\`\`\`🌍 COUNTRY INFO 🌍\`\`\`\n
🌍 *Country*: ${name} (${official}) ${flagEmoji}
🏛️ *Capital*: ${capital}
📍 *Continent / Subregion*: ${continent} / ${subregion}
📏 *Area*: ${area.toLocaleString()} km²
👥 *Population*: ${population.toLocaleString()}
💰 *Currency*: ${currency}
🗣️ *Languages*: ${languageList}
🗺️ *Google Maps*: ${maps}
🕰️ *Timezones*: ${timezones}
🚗 *Driving Side*: ${drivingSide}
🛂 *ISO Codes*: ${iso}
🌐 *Borders / Neighbors*: ${borders}
👤 *Demonym*: ${demonym}
✅ *Independent*: ${independent}
🌟 *Famous For*: ${famousFor}`;

      await zk.sendMessage(dest, {
        image: { url: flag },
        caption: countryMessage
      });

    } catch (error) {
      console.error("Error fetching country information:", error);
      repondre("❌ Unable to fetch country information. Please try again later.");
    }
  }
);

