const passGenerator = require("generate-password");

let randomPass = passGenerator.generate({
  length: 15,
  numbers: true,
  symbols: true,
});

module.exports = randomPass;
