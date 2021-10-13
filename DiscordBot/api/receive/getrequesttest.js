const test = [
  { title: `Hello there!` }
];

module.exports = {
  name: `Testing`,
  run(express){
    express.get(`/`, (req, res) => {
      res.send(test);
    });
  }  
};
