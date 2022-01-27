require('dotenv').config()
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { getPortfolioData } = require('./modules/GetPortfolioDataLocal.cjs');


async function generateHtml() {
    if (!fs.existsSync(path.resolve(__dirname, `../dist`))) {
        await fse.mkdir(path.resolve(__dirname, `../dist`));
    }

    let template = await fse.readFile(path.resolve(__dirname, '../src/index.ejs'), 'utf-8');
    let projects = await getPortfolioData();
    console.log("Projects ready for HTML:");
    console.log(projects);
    let content = ejs.render(template, { projects });
    await fse.writeFile('dist/index.html', content);
}

generateHtml();