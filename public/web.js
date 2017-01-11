var ctx = document.getElementById("chart");
var smaField = document.getElementById("smaField");
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(update);

var currentInput = "FB";

var globalTimeScale;

function update()
{
	loadData(currentInput, function(response){
		var data = response.dataset.data;
		var legend = response.dataset.column_names;

		var workingArr = [];

		workingArr.push(legend);

		for(var i = 1; i < data.length; i ++)
		{
			var tempDate = data[i][0].split("-");
		 	data[i][0] = new Date(tempDate[0], parseInt(tempDate[1])-1, tempDate[2]);
		 	workingArr.push(data[i]);
		}

		console.log(workingArr);

	 	var dataFinal = google.visualization.arrayToDataTable(workingArr);

		var options = {
			title: currentInput,
			hAxis: {title: 'date'},
			vAxis: {title: 'price'},
			trendlines: {
      		0: {
				color: 'purple',
        			lineWidth: 10,
        			opacity: 0.2,
	        		type: 'polynomial',
	        		degree: 3,
	        		visibleInLegend: true,
			}
			}
		 };

      var chart = new google.visualization.LineChart(document.getElementById('chartDiv'));

	 view  = new google.visualization.DataView(dataFinal);
	 view.hideColumns([2,3,4,5,6,7,8,9,10,11,12]);

	 chart.draw(view, options);


      });

}

function loadData(inputTicker, cb) {

	var queryInput = {
		ic: 'daily',
		isd: '2016-12-30',//'2016-01-01'
		it: 'none' //transformations
	}
	globalTimeScale = queryInput.ic;

    $.get("/data?inputTicker="+inputTicker+"&inputCollapse="+queryInput.ic+"&inputStartDate="+queryInput.isd+"&inputTransform="+queryInput.it, function(data) {
	   cb(data);
    })
}
function generateSMA(cb){
	var priceIndex = 1; //index to use for price comparison
	var changes = [];
	var avgMaster = 0;
	loadData(currentInput, function(response){
			var data = response.dataset.data;

			for(var i = 1; i < data.length; i ++)
			{
				changes.push(data[i][priceIndex] - data[i-1][priceIndex]);
				console.log(data[i][priceIndex]);
			}
			for(var i = 0; i < changes.length; i ++)
			{
				avgMaster += changes[i];
			}
			avgMaster = (avgMaster / changes.length) * -1; //-1 because most recent data is returned first
			cb(avgMaster);
	});

}
function fullPage(){
	generateSMA(function(data) {
		smaField.innerHTML = "dataset SMA: " + data + " dollars/" + globalTimeScale;
	});
}
