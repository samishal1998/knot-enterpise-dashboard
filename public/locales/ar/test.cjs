const main = require('./main.json');

function goDown(branch, prefix = '') {
	for (const key in branch) {
		const value = branch[key];
		if (typeof value === 'string') {
			branch[key] = (prefix ? prefix + '.' : '') + key;
		} else goDown(value, (prefix ? prefix + '.' : '') + key);
	}
}

goDown(main);

