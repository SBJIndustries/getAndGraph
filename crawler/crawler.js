var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.cnet.com"];
var terms = ["news"]
var rawHtml;
var pageCounter = 0;
var pages = [];
var plainText;
var counter = 0;

function crawl(cb) {
    for (let i = 0; i < urls.length; i++) {

        new Crawler().configure({
                depth: 3
            })
            .crawl(urls[i], function onSuccess(page) {
                if (page.url.search(urls[i].slice(11,urls[i].length-5))>0 && page.url.search(terms[i])>0){// this just checks if main part of the urls is in the searched urls
                    console.log(page.url);                                                    //this i needs to be changed to a j that loops through the entire terms list everytime a url is searched
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
