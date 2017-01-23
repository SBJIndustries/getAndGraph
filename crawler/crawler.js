var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.apple.com"];
var termsOn = true;
var terms = ["mac"];
var rawHtml;

var pageCounter = 0;
var pages = [];
var plainText;
var counter = 0;

function crawl(cb) {
    for (let i = 0; i < urls.length; i++) {

        new Crawler().configure({

                depth: 2// maybe we want to vary the depth depending on what the program finds

            })
            .crawl(urls[i], function onSuccess(page) {
                if (page.url.search(urls[i].slice(11,urls[i].length))>0 || (termsOn && new RegExp(terms.join("|")).test(page.url))){// this just checks if main part of the urls is in the searched urls
                    console.log(page.url);
                    pages.push(page.content);
                    pageCounter++;
                }
            }, null, function onAllFinished(crawledUrls) {
                cb(pages);
              //  console.log(pageCounter)
                console.log('Done'.blue);

            });
    }
}

crawl(function(pagesIn) {
    for (var i = 0; i < pagesIn.length; i++) {
        var cheerio = require('cheerio'),
            $ = cheerio.load(pagesIn[i]);
        plainText += $('article').text();
	   console.log(plainText);

    }
});
