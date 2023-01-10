import webpack from "webpack-stream";
import fs from 'fs';

const dirFiles = fs.readdirSync('src/components/');
let packJsFile = {
	app: '/src/helpers/js/app.js',
	helpers: '/src/helpers/js/helpers.js',
};

dirFiles.forEach(dir => {
	const dirFile = fs.readdirSync(`src/components/${dir}`);

	for (const src of dirFile) {
		if (src.includes(`component.${dir}.js`)) {
			packJsFile[dir] = `/src/components/${dir}/component.${dir}.js`;
		}
	}

})
export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			entry: packJsFile,
			output: {
				filename:  app.isBuild ? '[name].min.js' : '[name].js',
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}