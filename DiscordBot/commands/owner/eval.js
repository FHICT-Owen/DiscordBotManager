const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: `eval`,
  category: `owner`,
  run: async (client, message, args) => {
    if (message.author.id !== this.client.config.owner) return message.channel.send(`You do not have permission to use this command!`);
    const embed = new MessageEmbed()
      .setTitle(`Evaluating...`);
    const msg = await message.channel.send(embed);
    try {
      const data = eval(args.join(` `).replace(/```/g, ``));
      const embed = new MessageEmbed()
        .setTitle(`output:`)
        .setDescription(await data)
        .setColor(`GREEN`);
      await msg.edit(embed);
      await msg.react(`✅`);
      await msg.react(`❌`);
      const filter = (reaction, user) => (reaction.emoji.name === `❌` || reaction.emoji.name === `✅`) && (user.id === message.author.id);
      msg.awaitReactions(filter, { max: 1 })
        .then((collected) => {
          collected.map((emoji) => {
            switch (emoji._emoji.name) {
            case `✅`:
              msg.reactions.removeAll();
              break;
            case `❌`:
              msg.delete();
              break;
            default:
              return message.react(`❌`);
            }
          });
        });
    } catch (e) {
      const embed = new MessageEmbed()
        .setTitle(`error`)
        .setDescription(e)
        .setColor(`#FF0000`);
      return await msg.edit(embed);
    }
  }
};