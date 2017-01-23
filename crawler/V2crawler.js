var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.wsj.com/"];
var termsOn = false;
var terms = ["money"];
var foundUrls = [];
var searchedUrls = [];
var rawHtml;
var deep = 2;
var pageCounter = 0;
var pages = [];
var plainText;
var counter = 0;

function crawl(cb) {
    for (let i = 0; i < urls.length; i++) {

        new Crawler().configure({

                depth: 2 // maybe we want to vary the depth depending on what the program finds

            })
            .crawl(urls[i], function onSuccess(page) {
                if (page.url.search(urls[i].slice(11, urls[i].length - 1)) > 0) {
                    if (termsOn && new RegExp(terms.join("|")).test(page.url)) {
                        foundUrls.push(page.url);
                    }
                    searchedUrls.push(page.url);
                  //  pages.push(page.content);
                    pageCounter++;
                }
            }, null, function onAllFinished(crawledUrls) {
                //cb(pages);
                //console.log(pageCounter)
                reCrawl(foundUrls);
              //  console.log('Done'.blue);
              //  console.log(urls)

            });
    }
}

function reCrawl(foundUrls){
  for (let j = 1; j < foundUrls.length; j++) {
      new Crawler().configure({
              depth: 2
          }).crawl(foundUrls[j], function onSuccess(page) {
           if (new RegExp(terms.join("|")).test(page.url)){
              searchedUrls.push(page.url);
            }
           })
  }

}

function urlCheck(){


}


crawl(function(pagesIn) {
    for (var i = 0; i < pagesIn.length; i++) {
        var cheerio = require('cheerio'),
            $ = cheerio.load(pagesIn[i]);
        plainText.push($('article p'));
    }
    console.log(allContent);

});
