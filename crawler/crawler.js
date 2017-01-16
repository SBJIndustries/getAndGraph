var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.kentdenver.org/"];
var rawHtml;
var pageCounter = 0;
var pages = [];
var plainText;
var counter = 0;

function crawl(cb) {
    for (let i = 0; i < urls.length; i++) {

        new Crawler().configure({
                depth: 2
            })
            .crawl(urls[i], function onSuccess(page) {
                if (urls[i] == page.url.slice(0, urls[i].length)) {
                    console.log(page.url);
                    pages.push(page.content);
                    pageCounter++;
                }
            }, null, function onAllFinished(crawledUrls) {
                cb(pages);
                console.log('Done'.red);
            });
    }
}


crawl(function(pagesIn) {
    for (var i = 0; i < pagesIn.length; i++) {
        var cheerio = require('cheerio'),
            $ = cheerio.load(pagesIn[i]);
        plainText += $('body').text();

    }
});
