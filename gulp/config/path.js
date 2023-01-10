// Получаем имя папки проекта
import { constants } from 'buffer';
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Также можно использовать rootFolder
const srcFolder = `./src`;


export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		svg: `${buildFolder}/img/svg/`,
		html: `${buildFolder}/pages/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		js: `${srcFolder}/components/**/component.*.js`,
		images: `${srcFolder}/components/**/assets/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/components/**/assets/svg/*.svg`,
		scss: `${srcFolder}/components/**/component.*.scss`,
		html: `${srcFolder}/pages/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/components/**/assets/svg/*.svg`,
	},
	watch: {
		js: `${srcFolder}/**/*.js`,
		scss: `${srcFolder}/**/*.scss`,
		html: `${srcFolder}/**/*.html`, //.pug
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}
