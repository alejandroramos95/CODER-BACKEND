const yargs = require('yargs');

const args = yargs(process.argv.slice(2)).alias({
	m: 'mode',
	p: 'port',
	d: 'debug',
	s: 'storage'
}).default({
	mode: "prod",
	port: 8080,
    storage: "FS",
	debug: false
}).argv

module.exports = args;