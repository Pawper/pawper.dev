require('dotenv').config()
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { getPortfolioData } = require('./modules/GetPortfolioData.cjs');

async function generateHtml() {
    let template = await fse.readFile(path.resolve(__dirname, '../src/index.ejs'), 'utf-8');
    let projects = await getPortfolioData();
    console.log("Projects ready for HTML:");
    console.log(projects);
    let content = ejs.render(template, { projects });
    await fse.mkdir('dist');
    await fse.writeFile('dist/index.html', content);
}

generateHtml();