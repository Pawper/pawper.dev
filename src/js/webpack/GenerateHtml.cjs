const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { getPortfolioData } = require('./GetPortfolioData.cjs');

exports.generateHtml = async function () {
    let template = await fse.readFile(path.resolve(__dirname, '../../index.ejs'), 'utf-8');
    let projects = await getPortfolioData();
    console.log("Projects ready for HTML:");
    console.log(projects);
    let content = ejs.render(template, { projects });
    await fse.writeFile('src/index.html', content);
}