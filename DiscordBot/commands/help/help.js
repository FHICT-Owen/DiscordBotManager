const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: `help`,
  description:
    `Get list of all command and even get to know every command detials`,
  usage: `help <cmd>`,
  category: `info`,
  run: async (client, message, args) => {
    
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) 
        return message.channel.send(`Unknown Command: ` + args[0]);
      

      const embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField(`> ❯ Description`, command.description || `Not Provided :(`)
        .addField(`> ❯ Usage`, `\`` + command.usage + `\`` || `Not Provied`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(`BLUE`)
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      
      const commands = await client.commands;

      const emx = new MessageEmbed()
        .setDescription(`**A fun and moderation bot with 150+ commnds and 10+ category ** \n**If u got any error do ** \`qbug\` **your bug must be 10 ltters **`)
  
        .setColor(`BLUE`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        
        .setThumbnail(client.user.displayAvatarURL());
          
      const com = {};
      for (const comm of commands.array()) {
        const category = comm.category || `Unknown`;
        const name = comm.name;

        if (!com[category]) 
          com[category] = [];
        
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        const category = key;
        const desc = `\`` + value.join(`\`, \``) + `\``;
        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }
      emx.addField(`important links `,`**:link:  [Support](https://dsc.gg/abotsupport)**  | **[website](https://automodbot.com)**`);
      return message.channel.send(emx);
    }
  }
};
