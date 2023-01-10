export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: './dist/'
		},
		notify: false,
		port: 3000,
	});
}