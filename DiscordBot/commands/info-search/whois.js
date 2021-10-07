const { MessageEmbed } = require(`discord.js`);
const moment = require(`moment`);

module.exports = {
  name: `userinfo`,
  category: `info`,
  aliases: [`whois`, `user`],
  usage: `userinfo <MENTION>`,
  description: `Get advance stats of given person or yourself`,
  run: async (client, message, args) => {
    let user;

    if (!args[0]) 
      user = message.member;
    else 
      user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => {
        return message.channel.send(`:x: Unable to find this Person`); 
      });
    

    if (!user) 
      return message.channel.send(`:x: Unable to find this person!`);
    
    //OPTIONS FOR STATUS

    const stat = {
      online: `https://emoji.gg/assets/emoji/9166_online.png`,
      idle: `https://emoji.gg/assets/emoji/3929_idle.png`,
      dnd: `https://emoji.gg/assets/emoji/2531_dnd.png`,
      offline: `https://emoji.gg/assets/emoji/7445_status_offline.png`
    };

    //NOW BADGES
    let badges = await user.user.flags;
    badges = await badges ? badges.toArray() : [`None`];

    const newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace(`_`, ` `));
    });

    const embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }));

    //ACTIVITY
    const array = [];
    if (user.user.presence.activities.length) {

      const data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        const name = data[i].name || `None`;
        const xname = data[i].details || `None`;
        const zname = data[i].state || `None`;
        const type = data[i].type;

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``);

        if (data[i].name === `Spotify`) 
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace(`spotify:`, ``)}`);
        
        embed.setDescription(array.join(`\n`));
      }
    }

    //EMBED COLOR BASED ON member
    embed.setColor(user.displayHexColor === `#000000` ? `#ffffff` : user.displayHexColor);

    //OTHER STUFF 
    embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }));

    //CHECK IF USER HAVE NICKNAME
    if (user.nickname !== null) embed.addField(`Nickname`, user.nickname);
    embed.addField(`Joined At`, moment(user.joinedAt).format(`LLLL`))
      .addField(`Account Created At`, moment(user.user.createdAt).format(`LLLL`))
      .addField(`Common Information`, `ID: \`${user.user.id}\`\nDiscriminator: ${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}`)
      .addField(`Badges`, newbadges.join(`, `).toLowerCase() || `None`)
      .setFooter(user.user.presence.status, stat[user.user.presence.status]);
    return message.channel.send(embed).catch(err => {
      return message.channel.send(`Error : ` + err);
    });
  }
};