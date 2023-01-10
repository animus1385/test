import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlmin from "gulp-htmlmin";
import htmlReplace from "gulp-html-replace";

//import pug from "gulp-pug";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude())
		/*
		.pipe(pug({
			// Cжатие HTML файла
			pretty: true,
			// Показывать в терминале какой файл обработан
			verbose: true
		}))
		*/
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				htmlReplace({
					'css': '/css/styles.min.css',
					'helpers': '/css/helpers.min.css',
					'app': {
						src: 'js/app.min.js',
						tpl: ' <script defer type="module" src="%s"></script>'
					}
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				htmlReplace({ css: '/css/styles.min.css' })
				// htmlmin({ collapseWhitespace: true })
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}