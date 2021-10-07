module.exports = function log(category, content, userId, guildId) {
  this.client.axios.post(`/${category}`, {
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
