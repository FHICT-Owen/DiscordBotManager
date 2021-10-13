const client = require(`nekos.life`);
const neko = new client();

module.exports = {
  name: `fact`,
  category: `fun`,
  description: `sends a cool fact`,
  usage: `[command]`,
  run: async (client, message) => {
    async function work() {
      const owo = (await neko.sfw.fact());
      message.channel.send(owo.fact).catch(error => {
        console.error(error);
      });

      message.delete();
    }
    work();
  }
};