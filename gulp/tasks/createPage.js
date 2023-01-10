import fs from 'fs';

export default function createPage(page, ...args) {

    if (!fs.existsSync(`src/pages/${page}.html`)) {

        let CSS = [];
        let section = [];
        let header, footer;

        if (args) {
            args.forEach(link => {

                CSS.push(`<link rel="stylesheet" href="/css/components.${link}.css">`);

                if (link == 'header') {
                    header = `@@include("../components/${link}/components.${link}.html")`;

                } else if (link == 'footer') {
                    footer = `@@include("../components/${link}/components.${link}.html")`;

                } else {
                    section.push(`@@include("../components/${link}/components.${link}.html")`);
                }
            });
        }


        let templateHtml = `<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page}</title>
        <!-- build:css --> 
        <link rel="stylesheet" href="/css/styles.css">
        <!-- endbuild -->    
        <!-- build:component --> 
        ${CSS.join('\n\t\t')}
        <!-- endbuild -->
        <!-- build:helpers --> 
        <link rel="stylesheet" href="/css/helpers.css">
        <!-- endbuild -->
        <!-- build:app --> 
        <script defer type="module" src="/js/app.js"></script>
        <!-- endbuild -->
    </head>
    <body>
    ${header ?? ''}
    <main class="content">
        <div class="container">
            ${section.join('\n\t\t\t') ?? ''}
        </div>
    </main>
    ${footer ?? ''}
    </body>
</html > `;

        fs.writeFileSync(`src/pages/${page}.html`, templateHtml, function () { });
    } else {
        try {
            throw new Error('Такая страница уже существует');

        } catch (error) {
            console.log('\x1b[31m', `\n${error.message}\n`)
        }

    }
}