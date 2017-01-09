

function update()
{
	loadData(currentInput, function(response){

	});
}

function loadData(inputTicker, cb) {

    $.get("/data?inputTicker="+inputTicker, function(data) {
        cb(JSON.parse(data));
    })
}
