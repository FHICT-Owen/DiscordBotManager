const { default_prefix } = require('../config.json');
module.exports = async bot => {
  console.log(`${bot.user.username} is available now!`);
  let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0);
  var activities = [ `${bot.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
  setInterval(() => bot.user.setActivity(`${default_prefix}help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }),5000); 
};