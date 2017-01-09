var Crawler = require('js-crawler');

var urls = ["https://www.kentdenver.org/"]
for (var i = 0; i<urls.length; i++){
new Crawler().configure({depth: 3})// we are just looking to get the article code
  .crawl(urls[i], function onSuccess(page) {
    //console.log(page.url);
  }, null, function onAllFinished(crawledUrls) {
    console.log('All crawling finished');
    console.log(crawledUrls); // we want to store this value
  });
}
