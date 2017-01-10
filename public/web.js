var ctx = document.getElementById("chart");
var currentInput = "AAPL";

function makeChart(dataIn)
{
	ctx.width  = window.innerWidth;
    var myChart = new Chart(ctx, {
        	type: 'line',
        	data: dataIn,
        	label: currentInput
	});
}

function update()
{
	loadData(currentInput, function(response){
		var data = response.dataset.data;
		var legend = response.dataset.column_names;
		var excludedIndex = [5,6,7,8,9,10,11,12];

		console.log(legend);

		var inputLabels = [];
		var inputDatasets = [];

		var constructionSet = [];
		for(var i = 1; i < legend.length; i ++)
		{
			if(!constructionSet[i-1]) {
				constructionSet[i-1] = [];
			}
			for(var j = 0; j < data.length; j ++)
			{
				constructionSet[i-1].push(data[j][i]);
			}

		}
		for(var i = 0; i < constructionSet.length; i ++)
		{
			if($.inArray(i + 1, excludedIndex) == -1)
			{
				var colors = [Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1)];
				inputDatasets.push({
				    label: legend[i + 1],
				    fill: false,
				    lineTension: 0,
				    backgroundColor: "rgba("+colors[0]+","+colors[1]+","+colors[2]+",0.4)",
				    borderColor: "rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)",
				    borderCapStyle: 'butt',
				    borderDash: [],
				    borderDashOffset: 0.0,
				    borderJoinStyle: 'miter',
				    pointBorderColor: "rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)",
				    pointBackgroundColor: "#fff",
				    pointBorderWidth: 1,
				    pointHoverRadius: 5,
				    pointHoverBackgroundColor: "rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)",
				    pointHoverBorderColor: "rgba("+colors[0]+","+colors[1]+","+colors[2]+",1)",
				    pointHoverBorderWidth: 2,
				    pointRadius: 1,
				    pointHitRadius: 10,
				    data: constructionSet[i],
				    spanGaps: false,
				 })
			 }
		}
		console.log(inputDatasets);

		for(var i = 0; i < data.length; i ++)
		{
			inputLabels.push(data[i][0]);
		}


		var data = {
              labels: inputLabels,
              datasets: inputDatasets
          };

      	makeChart(data);
      });
}

function loadData(inputTicker, cb) {

	var queryInput = {
		ic: 'monthly',
		isd: '2000-01-01',//'2016-01-01'
		it: 'none' //transformations
	}

    $.get("/data?inputTicker="+inputTicker+"&inputCollapse="+queryInput.ic+"&inputStartDate="+queryInput.isd+"&inputTransform="+queryInput.it, function(data) {
	   cb(data);
    })
}
function generateSMA(){
	var priceIndex = 1; //index to use for price comparison
	var changes = [];
	var avgMaster = 0;
	loadData(currentInput, function(response){
			var data = response.dataset.data;

			for(var i = 1; i < data.length; i ++)
			{
				changes.push(data[i][priceIndex] - data[i-1][priceIndex]);
			}
			for(var i = 0; i < changes.length; i ++)
			{
				avgMaster += changes[i];
			}
			avgMaster = (avgMaster / changes.length);
			console.log(avgMaster);
	});
}
