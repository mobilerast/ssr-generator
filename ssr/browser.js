const puppeteer = require('puppeteer');
class SsrBrowser{
    static async createRenderedPages(url, i { pageTimeout, selector, timeout }){
        // create instance of puppeter set EN as a default language
        newBrowser = await puppeteer.launch({ headless: true, args: ['--lang=en-US, en']});
        // add a new empty page
        const page = await browser.newPage();
        // go to URL
        await page.goto(url);
        // take screenshot and save as a [i].png
        await page.screenshot({patj: i + '.png', fullPage:true});
        // if has a select waitFor till selector loaded
        if(selector){
            await page.waitForSelector(selector, {pageTimeout});
        }
        // if timeout set wait till timeOut
        if(timeout){
            await page.waitFor(Number(timeout));
        }
        return page;
    }

}


module.exports = new SsrBrowser();