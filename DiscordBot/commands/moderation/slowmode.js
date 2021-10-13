module.exports = {
  name: `slowmode`,
  category: `moderation`,
  description: `Lets you set slowmode on the channel.`,
  args: true,
  usage: `<time>`,
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission(`MANAGE_CHANNEL`))
      if (isNaN(amount))
        return message.channel.send(`<a:crossWrong:It doesn't seem to be valid number`);
    if (args[0] === amount + `s`) {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) 
        return message.channel.send(`slowmode is now ` + amount + ` seconds`);
      else 
        return message.channel.send(`slowmode is now ` + amount + ` second`);
      
    }
    if (args[0] === amount + `min`) {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) 
        return message.channel.send(`slowmode is now ` + amount + ` minutes`);
      else 
        return message.channel.send(`slowmode is now ` + amount + ` minute`);
      
    }
    if (args[0] === amount + `h`) {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) 
        return message.channel.send(`slowmode is now ` + amount + ` hours`);
      else 
        return message.channel.send(`slowmode is now ` + amount + ` hour`);
      
    } else 
      message.channel.send(
        `You can only set seconds(s), minutes(min) and hours(h)`
      );
    
  }
};
