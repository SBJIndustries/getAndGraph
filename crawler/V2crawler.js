var Crawler = require('js-crawler');

var urls = ["http://www.kentdenver.org/"];
var result = [];

var counter = 0;
function crawl(cb){

	for (let i = 0; i < urls.length; i++) {
		console.log(urls[i].length);
	    new Crawler().configure({
	            depth: 2
	        }).crawl(urls[i], function onSuccess(page) {
	                if (urls[i] == page.url.slice(0, urls[i].length)) {
	                    result.push(page.url);
	                    counter++;
	                }
			  cb(result);
	      });
	}
}

crawl (function(data) {
	console.log(data);
});



//, null, function onAllFinished(crawledUrls) {
// for (var i = 0; i < urls.length; i++) {
//     for (var j = 0; j < crawledUrls.length; j++) {
//         if (urls[i] == crawledUrls[j].slice(0, urls[i].length)) {
//             console.log(crawledUrls[j]);
//             counter++;
//         }
//     }
//
// }



//console.log(crawledUrls[j]); // we want to store this value


//console.log(crawledUrls);
// console.log("the counter is " + counter);
// console.log("array length is " + crawledUrls.length)
// console.log("the difference is " + (crawledUrls.length - counter))

//console.log('All crawling finished');
//    });
//}
