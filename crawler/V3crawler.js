var Crawler = require('js-crawler');
var colors = require('colors');


var urls = ["http://www.apple.com/mac"];
var foundUrls = [];
var searchedUrls = [];
var termsOn = true;
var terms = ["mac"];
var rawHtml;
var pageCounter = 0;
var pages = [];
var allContent = [];
var plainText = [];
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
                    allContent.push(page.content);
                    console.log(page.url);

                    //  pages.push(page.content);

                }
            }, null,
            function onAllFinished(crawledUrls) {

                for (let j = 1; j < foundUrls.length; j++) {
                    new Crawler().configure({
                        depth: 2
                    }).crawl(foundUrls[j], function onSuccess(page) {
                        if (new RegExp(terms.join("|")).test(page.url)) {
                            searchedUrls.push(page.url);
                            allContent.push(page.content);
                            console.log(page.url);
                        }
                    })
                  //  cb(allContent);
                }
                console.log(foundUrls);
            }
    }
  }



    crawl(function(pagesIn) {
      console.log("we gud".blue)
        for (var i = 0; i < pagesIn.length; i++) {
            var cheerio = require('cheerio'),
                $ = cheerio.load(pagesIn[i]);
            plainText += $('article').text();
            plainText.push($('article p'));
        }
        for (var i = 0; i < plainText.length; i++) {
            console.log(plainText[i].text());

        }
    });
