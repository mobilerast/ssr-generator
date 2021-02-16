const { url } = require('koa-router');
const puppeteer = require('puppeteer');
const myWebSiteUrls = require('./my-website-urls.json');
let newBrowser;
class SsrBrowser{
    static async createRenderedPages(url, i, pageTimeout, selector, timeout){
        // create instance of puppeter set EN as a default language
        newBrowser = await puppeteer.launch({ headless: true, args: ['--lang=en-US, en']});
        // add a new empty page
        const page = await newBrowser.newPage();
        // go to URL
        await page.goto(url);
        // take screenshot and save as a [i].png
        await page.screenshot({patj: i + '.png', fullPage:true});
        // if has a select waitFor till selector loaded
        if(selector){
            await page.waitForSelector(selector, pageTimeout);
        }
        // if timeout set wait till timeOut
        if(timeout){
            await page.waitFor(Number(timeout));
        }
        return page;
    }

    async loader(){

        // 
        const keepUrlsInTempArr = [];
        myWebSiteUrls.forEach(data => {
            keepUrlsInTempArr.push({url:data})
        });
        let pageTimeout, selector, timeout;

        for (let i = 0; i < keepUrlsInTempArr.length; i++) {
            const page = await SsrBrowser.createRenderedPages(keepUrlsInTempArr[i].url, i,
                pageTimeout,
                selector,
                timeout);
            let html = await page.evaluate(() => document.documentElement.outerHTML);
            console.log(html);
            // rendered HTML html
            // send html, pathName to the fileSaver
            await page.close()
            ctx.body = html;
        }
  

        
    }

}


module.exports = new SsrBrowser();