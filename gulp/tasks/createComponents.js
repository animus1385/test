import fs from 'fs';

export default function createComponents(components) {

    let templateImportJs = `import ${components} from "../../components/${components}/component.${components}.js";`;
    let templateImportSCSS = `@import "../../components/${components}/component.${components}.scss"`;
    let templateJsComponent = `export default function ${components}() {}`;
    let templateHtml = `<section class="${components}">\n\t<div class="container"></div>\n</section>`;
    let templateScss = `@import "../../helpers/scss/variables.scss";\n@import "../../helpers/scss/mixin.scss";\n\n.${components}{}`;

    let fileJs = fs.readFileSync('src/helpers/js/app.js', 'utf8');
    let fileSCSS = fs.readFileSync('src/helpers/scss/styles.scss', 'utf8');

    if (!fs.existsSync(`src/components/${components}`)) {

        fs.mkdirSync(`src/components/${components}`, function () { })

        fs.writeFileSync(`src/components/${components}/component.${components}.scss`, templateScss, function () { });
        fs.writeFileSync(`src/components/${components}/component.${components}.js`, templateJsComponent, function () { });
        fs.writeFileSync(`src/components/${components}/component.${components}.html`, templateHtml, function () { });

        const importSCSS = () => `${fileSCSS}\n${templateImportSCSS};`;
        const importJS = () => `${templateImportJs}\n${fileJs}`;
        const startJS = () => `${importJS()}\n${components}();`;

        fs.writeFile(`src/helpers/js/app.js`, importJS(), function () { });
        fs.writeFile(`src/helpers/js/app.js`, startJS(), function () { });
        fs.writeFile(`src/helpers/scss/styles.scss`, importSCSS(), function () { });

        console.log(`Компонент ${components} создан`);
    } else {
        try {
            throw new Error('Этот компоент уже создан');
        } catch(error) {
            console.log('\x1b[31m', `\n${error.message}\n`)
        }
       
    }
}