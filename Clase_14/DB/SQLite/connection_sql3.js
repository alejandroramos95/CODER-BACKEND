const Path = require('node:path');
const options = {
  client: 'sqlite3',
  connection: {
    filename: Path.join(__dirname, './ecommerce.sqlite3')
  },
  useNullAsDefault: true
}

module.exports = {
  options
}