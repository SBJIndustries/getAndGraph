var unirest = require('unirest');
var express = require('express');

var app = express();
app.set('views', '.');
app.set("view engine", "pug");
app.use(express.static('public'));
app.get("/",function(req,res){
    res.render("index");
});

app.get("/data",function(req,res){
    var inputTicker = req.query.inputTicker;
    data(inputTicker, function(response) {
        res.json(response.raw_body);
    })
});
app.get("/settings",function(req,res){
	var period = req.query.period; //day, month, year etc.
	var NumberOfDays = req.query.NumberOfDays; //number of days to search back for data
	var Type = req.query.Type; //price, sma etc.
	var Params = req.query.Type;

	var inputParams = {
		NOD: NumberOfDays,
		PD: period,
		TP: type,
		PMS: params
	}
});

function data(inTicker, cb)
{

	var input = {
		Normalized: false,
		NumberOfDays: 20,
		DataInterval: 0,
		DataPeriod: "Day",
		Elements: [{Symbol: inTicker, Type: "price", Params: ["c"]}]
	}

	unirest.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=' + JSON.stringify(input)).headers({
		'Accept': 'application/json'
		, 'Content-Type': 'application/json'
		}).end(function (response) {
			cb(response);
		});
}

if(true)//test output
{
	data("AAPL", function(response) {
         console.log(response.raw_body);
     })
}
