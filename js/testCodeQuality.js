let log4js = require('log4js');
let logger = log4js.getLogger();
let stdin = process.openStdin();
stdin.addListener('data', function(g) {
	let x = g.toString();
	let r = [];
	r[0] = x[0];
	let j = 1;
	for(let i = 1; i < x.length - 1; i = i + 1) {
		if(x[i] % 2 === 0 && x[i - 1] % 2 === 0) {
			r.splice(j, 0, '-', x[i]);
			j = j + 2;
		}
		else {
			r.splice(j, 0, x[i]);
			j = j + 2;
		}
	}
	logger.debug(r.join(''));
process.exit();
});
