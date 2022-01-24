const puppeteer = require('puppeteer');
const cloudinary = require('./Cloudinary.cjs')
cloudinary.ping();
cloudinary.usage();

exports.getProjectImage = async function (url, siteName) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1620,
      height: 969
    })
    await page.goto(url, {waitUntil: 'domcontentloaded'});  
    await page.waitForTimeout(3500);
    const buffer = await page.screenshot({
        type: 'webp'
    })
    const { secure_url } = await cloudinary.uploadStream(buffer);
    console.log(`Successfully uploaded, url: ${secure_url}`);
    await browser.close();
    return secure_url
  } catch(e) {
    console.log(e);
  }
}