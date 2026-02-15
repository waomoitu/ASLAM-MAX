const { dullah } = require("../Aslam/dullah");
const moment = require("moment");

dullah(
  {
    nomCom: "age",
    categorie: "utility",
    reaction: "🎉",
    desc: "Calculate your age based on your date of birth.",
    use: ".age <DD/MM/YYYY>"
  },

  async (dest, zk, { reply, arg, ms }) => {

    try {
      if (!arg || !arg[0]) {
        return reply("❌ Please provide your date of birth in DD/MM/YYYY format.\nExample: `.age 15/08/1995`");
      }

      const birthDate = arg[0];
      const dob = moment(birthDate, "DD/MM/YYYY");

      if (!dob.isValid()) {
        return reply("❌ Invalid date format. Example: `.age 15/08/1995`");
      }

      const age = moment().diff(dob, "years");

      reply(`🎉 Your age is: *${age}* years old.`);
    } catch (error) {
      console.error("AGE ERROR:", error.message);
      reply("❌ An error occurred while calculating your age.");
    }
  }
);
