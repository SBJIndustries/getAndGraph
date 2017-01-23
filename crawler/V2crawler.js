var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.wsj.com/"];
var termsOn = false;
var terms = ["money"];
var deep = 2;
var pageCounter = 0;
var pages = [];
var allContent = [];
var plainText = [];
var counter = 0;

function crawl(cb) {
    for (let i = 0; i < urls.length; i++) {

        new Crawler().configure({
                depth: 2
            })
            .crawl(urls[i], function onSuccess(page) {
                if (page.url.search(urls[i].slice(11,urls[i].length-1))>0){
			 	if (termsOn && new RegExp(terms.join("|")).test(page.url)){
					urls.push(page.url);
					allContent.push(page.content);
				}
				if(!termsOn){
					urls.push(page.url);
					allContent.push(page.content);
				}
                    pageCounter++;
				console.log(pageCounter);
                }
            }, null, function onAllFinished(crawledUrls) {
                console.log('Done'.blue);
			console.log(urls)
			cb(allContent);

            });
    }
}

crawl(function(pagesIn) {
    for (var i = 0; i < pagesIn.length; i++) {
        var cheerio = require('cheerio'),
            $ = cheerio.load(pagesIn[i]);
        plainText.push($('article p'));
    }
    for (var i = 0; i < plainText.length; i ++) {
	    allContent += plainText[i].text();
    }
    console.log(allContent);

});
