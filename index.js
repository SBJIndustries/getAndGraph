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
    chart(inputTicker, function(response) {
        res.json(response.raw_body);
    })
});
