var Crawler = require('js-crawler');
const emitter = new EventEmitter()

emitter.setMaxListeners(100)
new Crawler().configure({maxRequestsPerSecond: 2,  maxConcurrentRequests: 1}).crawl({
  url: "http://www.nytimes.com/",
  success: function(page) {
    console.log(page.url);
  },
  failure: function(page) {
    console.log(page.status);
  }
});
