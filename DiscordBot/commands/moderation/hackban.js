const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: `hackban`,
  description: `asdf`,
  category: `moderation`,
  run: async(client, message, args) => {
        
    if(!message.channel.permissionsFor(message.member).has(`BAN_MEMBERS`) && !this.client.owner.includes(message.author.id)) return;
    const target = args[0];
    if (isNaN(target)) return message.reply(`Please specify an ID`);
    const reason = args.splice(1, args.length).join(` `);

    try {
      message.guild.members.ban(target, {reason: reason.length < 1 ? `No reason supplied.`: reason});
      const embed2 = new MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(`**They were successfully banned. User was not notified!**`);
      await message.channel.send(embed2);      
      
      //write logging function      
      client.log(`moderation`, ``,``,``);
    } catch (error) {
      console.log(error);
    }
  }
};