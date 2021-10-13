/* eslint-disable no-undef */
const axios = require(`axios`);
const { CanvasSenpai } = require(`canvas-senpai`);
const canva = new CanvasSenpai();
const discord = require(`discord.js`);
const express = require(`express`);
const helmet = require(`helmet`);
const morgan = require(`morgan`);
const jwt = require(`express-jwt`);
const jwksRsa = require(`jwks-rsa`);
const client = new discord.Client({
  disableEveryone: false
});

const cn = require(`./functions/console.js`);
client.config = require(`./config.json`);
client.log = require(`./functions/log.js`);
client.app = express();
client.queue = new Map();
client.vote = new Map();

const port = process.argv.slice (2)[0];
if (!port) process.exit(cn.error(`PORT`, `Port was not properly defined! Killing App.`));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-cgiwratest.eu.auth0.com/.well-known/jwks.json`
  }),

  audience: `https://discord-bot/`,
  issuer:`https://dev-cgiwratest.eu.auth0.com/`,
  algorithms: [`RS256`]
});

client.app.use(checkJwt);
client.app.use(helmet());
client.app.use(express.json());
client.app.use(morgan(`combined`));

client.axios = axios.create({
  baseURL: `http://log-service/`,
  timeout: 1000
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

[`command`].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
require(`./functions/api.js`)(client);

client.app.listen(port, () => {
  cn.log(`Eureka`, `Client listening on port ${port}`);
  cn.log(`API`, `Service listening on port ${port}`);
});
require(`./api/eureka-helper.js`).registerWithEureka(`DISCORD-BOT`, port);

client.queue = new Map();
process.on(`unhandledRejection`, error => console.error(`Uncaught Promise Rejection`, error));
process.on(`uncaughtException`, error => console.error(`Uncaught exception`, error));

client.on(`message`, async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(client.config.prefix)) return;
  if (!message.member) message.member = message.guild.fetchMember(message); 

  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

client.on(`guildMemberAdd`, async member => {
  const chx = client.config.welcome;

  if (chx === null) 
    return;
  
  const data = await canva.welcome(member, { link: `https://cdn.discordapp.com/attachments/815889737750544405/827575020338675822/welcome_imgae.png`, blur: false });
  const attachment = new discord.MessageAttachment(
    data,
    `welcome-image.png`
  );
  client.channels.cache.get(chx).send(`Welcome to ${member.guild.name}, Server ${member.user}\nYou are our ${member.guild.memberCount}th Member. Enjoy `, attachment);
});

client.snipes = new Map();
client.on(`messageDelete`, function (message) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  });
});

client.on(`ready`, () => {
  client.user.setStatus(`online`);
});

require(`http`).createServer((req, res) => res.end(`AutomodBot is alive! Join support server https;//dsc.gg/cwkhan`)).listen(3000);

client.on(`ready`, () => {
  client.user.setActivity(`qhelp|Made By cwkhan `, { type: `PLAYING` });
});

client.on(`guildCreate`, guild => {
  // Add to list of guilds
  axios.post(`/guilds`, {
    guildId: guild.id
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

client.on(`guildDelete`, guild => {
  // Remove from list of guilds
  client.axios.delete(`/guilds`, {
    guildId: guild.id
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

const smartestchatbot = require(`smartestchatbot`);
const scb = new smartestchatbot.Client();

client.on(`message`, async message => {
  if (message.channel.name === `abotchat`) {
    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, `everyone`).replace(/@(here)/gi, `here`);
    if (message.content.includes(`@`)) 
      return message.channel.send(`**:x: Please dont mention anyone**`);
    
    message.channel.startTyping();
    if (!message.content) return message.channel.send(`Please say something.`);
    scb.chat({ message: message.content, name: client.user.username, owner: `OwendB`, user: message.author.id, language: `auto` }).then(reply => {
      message.inlineReply(`${reply}`);
    });
    message.channel.stopTyping();
  }
});

client.login(process.env.TOKEN || client.config.token)
  .then(
    () => {
      client.user.setActivity(`The Network`, { type: `WATCHING` });
      cn.log(`Startup`, `Logged in as ${client.user.username}#${client.user.discriminator}`);
      cn.log(`Guilds`, `Connected to ${client.guilds.cache.size} guild${client.guilds.cache.size > 1 ? `s ` : ` `}`);
    },
    (err) => {
      require(path.join(__dirname, `functions/console.js`)).error(`Login`, err);
    }
  )
  .catch((err) => console.error(err));
