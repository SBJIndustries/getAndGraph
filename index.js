var unirest = require('unirest');
var express = require('express');

var key = "f1sja7zDUi7Yy5qxskks";

var app = express();
app.set('views', '.');
app.set("view engine", "pug");
app.use(express.static('public'));
app.get("/",function(req,res){
    res.render("index");
});

app.get("/data",function(req,res){
    var inputTicker = req.query.inputTicker;
    var inputStartDate = req.query.inputStartDate;
    var inputCollapse = req.query.inputCollapse;
    var inputTransform = req.query.inputTransform;
    data(inputTicker,inputStartDate,inputCollapse,inputTransform, function(response) {
        res.json(response);
    })
});

function data(inTicker,inStartDate,inCollapse,inTransform, cb)
{

	var input = {
		database: "WIKI",
		dataset: inTicker,
		startDate: inStartDate,
		collapse: inCollapse,
		transform: inTransform
	}

	unirest.get("https://www.quandl.com/api/v3/datasets/"+input.database+"/"+input.dataset+".json?start_date="+input.startDate+"&collapse="+input.collapse+"&transform="+input.transform+"&api_key="+key)
	.end(function (response) {
			cb(response.body);
	});
}
app.listen(8080);
