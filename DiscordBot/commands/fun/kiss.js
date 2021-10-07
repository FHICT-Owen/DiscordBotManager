const discord = require(`discord.js`);
const { Random } = require(`something-random-on-discord`);
const random = new Random();

module.exports = {
  name: `kiss`,
  category: `fun`,
  description: `Kiss someone`,
  run: async (client, message) => {
    const target = message.mentions.members.first();
    const data = await random.getAnimeImgURL(`kiss`);
    const embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor(`RANDOM`)
      .setFooter(`${message.author.username} kisses ${target.user.username}`)
      .setTimestamp();
    
    message.channel.send(embed);
  }
};