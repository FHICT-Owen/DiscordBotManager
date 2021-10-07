const discord = require(`discord.js`);
const { Random } = require(`something-random-on-discord`);
const random = new Random();

module.exports = {
  name: `hug`,
  category: `fun`,
  description: `Hug someone`,
  run: async (client, message) => {
    const target = message.mentions.members.first();
    const data = await random.getAnimeImgURL(`hug`);
    const embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor(`RANDOM`)
      .setFooter(`${message.author.username} hugs ${target.user.username}`)
      .setTimestamp();
    
    message.channel.send(embed);
  }
};