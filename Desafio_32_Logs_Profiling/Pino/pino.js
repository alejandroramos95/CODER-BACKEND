const pino = require('pino');
const fs = require('fs');
const pretty = require('pino-pretty');
let streams = [
	{level: 'info', stream: pretty()},
	{level: 'error', stream: fs.createWriteStream('error.log')},
	{level: 'warn', stream: fs.createWriteStream('warn.log')},
];

const opts = {
	levels: {
		silent: Infinity,
		warn: 40,
		error: 50,
	},
	dedupe: true,
}

const logger = pino({
	level: 'warn',
}, pino.multistream(streams, opts));

module.exports = {logger};