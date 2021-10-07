const discord = require(`discord.js`);
const { Random } = require(`something-random-on-discord`);
const random = new Random();

module.exports = {
  name: `pat`,
  category: `fun`,
  description: `Pat someone`,
  run: async (client, message) => {    
    const target = message.mentions.members.first();    
    const data = await random.getAnimeImgURL(`pat`);    
    const embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor(`RANDOM`)
      .setFooter(`${message.author.username} pats ${target.user.username}`)
      .setTimestamp();    
    message.channel.send(embed);
  }
};