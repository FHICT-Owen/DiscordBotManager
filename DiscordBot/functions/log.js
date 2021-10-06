const axios = require('axios');

module.exports = function log(category, content, userId, guildId) {
  axios.post(`/${category}`, {
    action: content,
    user: userId,
    guild: guildId
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
