const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

exports.getProjectImage = async function (url, siteName) {
  if (!fs.existsSync(path.resolve(__dirname, `../../dist/images`))) {
    fs.mkdirSync(path.resolve(__dirname, `../../dist/images`));
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1620,
      height: 969
    });
    await page.goto(url, {waitUntil: 'domcontentloaded'});  
    await page.waitForTimeout(3500);
    await page.screenshot({
      type: 'webp',
      path: path.resolve(__dirname, `../../dist/images/${siteName}.webp`)
    });
    await browser.close();
    return `images/${siteName}.webp`;
  } catch(e) {
    console.log(e);
  }
}