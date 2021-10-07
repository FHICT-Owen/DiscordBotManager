const Discord = require(`discord.js`);

module.exports = {
  name: `snipe`,
  aliases: [`ms`, `messagesnipe`],
  category: `info`,
  usage: `(prefix)snipe`,
  description: `Get last message which is deleted with message Author and Image(If any)`,
  run:async (client, message) => {
    
    const msg = client.snipes.get(message.channel.id);
    if(!msg) return message.channel.send(`There's nothing to snipe!`);
    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author)
      .setDescription(msg.content);
    if(msg.image)embed
      .setImage(msg.image)
      .setColor(`00FFFF`)
      .setTimestamp();
    
    message.channel.send(embed);    
  }
};