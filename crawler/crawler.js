var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.kentdenver.org/"];
var rawHtml;
var pageCounter = 0;
var pages = [];
var plainText;

function crawl(cb) {
    for (var i = 0; i < urls.length; i++) {
      //console.log(urls[i].length)
        new Crawler().configure({
                depth: 3
            }) // we are just looking to get the article code
            .crawl(urls[i], function onSuccess(page) {
                pageCounter++;
                //console.log(pageCounter);
                pages.push(page.content);
            }, null, function onAllFinished(crawledUrls) {
                for(var i = 0; i< urls.length; i++){
                  for(var j = 0; j < crawledUrls.length;j++){
                    if(urls[i]==crawledUrls[j].slice(0,urls[i].length)){
                      crawledUrls.splice( j, 1 );
                    }
                  }

                }



                //console.log(crawledUrls[j]); // we want to store this value
                //cb(rawHtml);


                console.log(crawledUrls);


                console.log('All crawling finished');
            });
    }
}


crawl(function(rawHtml) {
    for (var i = 0; i < pages.length; i++) {
        var cheerio = require('cheerio'),
            $ = cheerio.load(pages[i]);
        plainText += $('body').text();

    }
    //	console.log(plainText);
});
