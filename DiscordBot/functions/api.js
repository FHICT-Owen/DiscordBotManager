const { readdirSync } = require(`fs`);
const ascii = require(`ascii-table`);

const table = new ascii(`Api`);
table.setHeading(`Listener`, `Load status`);

module.exports = (client) => {
  // Read folder of defined endpoints for api
  const endpoints = readdirSync(`./api/receive`).filter(file => file.endsWith(`.js`));

  // Loop over the listeners, if there is no name defined for a listener,
  // Prevent it from running and log it to the table
  for (const endpoint of endpoints) {
    const pull = require(`../api/receive/${endpoint}`);
  
    if (pull.name) {
      table.addRow(endpoint, `✅`);
      pull.run(client.app);
    } else {
      table.addRow(endpoint, `❌  -> missing help.name.`);
      continue;
    }
  }
  // Log the table of loaded listeners
  console.log(table.toString());
};