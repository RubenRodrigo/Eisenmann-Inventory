const baseUrl = '/usr/src/app'
// const baseUrl = '/home/tkmiz/Documents/Projects/Eisenemann/eisenmann-inventory';

module.exports = {
	apps: [
		{
			name: 'eisenmann',
			cwd: baseUrl,
			script: 'npm',
			args: 'run dev',
		},
		// optionally a second project
	],
};