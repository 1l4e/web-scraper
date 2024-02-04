module.exports = {
	apps: [
		{
			name: "svelte-app",
			script: "node",
			args: ["build"],
			exec_mode: "fork",
			instances: 1,
			env: {
				HOST: "127.0.0.1",
				PORT: 1234,
			},
		},
	],
};
