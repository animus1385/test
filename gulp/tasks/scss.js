import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
// import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов
import fs from 'fs';

const dirFiles = fs.readdirSync('src/components/');
let packCSSFile = [
	'src/helpers/scss/styles.scss',
	'src/helpers/scss/helpers.scss'
];

dirFiles.forEach(dir => {
	const dirFile = fs.readdirSync(`src/components/${dir}`);

	for (const src of dirFile) {
		if (src.includes(`component.${dir}.scss`)) {
			packCSSFile.push(`src/components/${dir}/component.${dir}.scss`);
		}
	}

})

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(packCSSFile, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true
				})
			)
		)
		// .pipe(
		// 	app.plugins.if(
		// 		app.isBuild,
		// 		// webpcss(
		// 		// 	{
		// 		// 		webpClass: ".webp",
		// 		// 		noWebpClass: ".no-webp"
		// 		// 	}
		// 		// )
		// 	)
		// )
		// Раскомментировать если нужен не сжатый дубль файла стилей
		.pipe(
			app.plugins.if(
				app.isDev,
				app.gulp.dest(app.path.build.css)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				rename(
					{
						extname: ".min.css"
					})
			))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}

