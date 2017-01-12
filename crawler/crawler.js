var Crawler = require('js-crawler');
var colors = require('colors');

var urls = ["http://www.wsj.com/"];
var rawHtml;
var pageCounter = 0;
var pages = [];
var plainText;

function crawl(cb)
{
	for (var i = 0; i<urls.length; i++){

		new Crawler().configure({depth: 2})// we are just looking to get the article code
	  	.crawl(urls[i], function onSuccess(page) {
			pageCounter ++;
			console.log(pageCounter);
	    		pages.push(page.content);
	  	}, null, function onAllFinished(crawledUrls) {

	    		console.log('All crawling finished');
			cb(rawHtml);
	    		//console.log(crawledUrls); // we want to store this value

	  });
	}
}

crawl(function(rawHtml) {
	for(var i = 0; i < pages.length; i ++)
	{
		var cheerio = require('cheerio'),
			$ = cheerio.load(pages[i]);
		plainText += $('body').text();

	}
	console.log(plainText);
});
