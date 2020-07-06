google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartDeaths);

function drawChartDeaths() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales'],
        ['2004',  1000],
        ['2005',  1170],
        ['2006',  660],
        ['2007',  1030]
    ]);

    var options = {
        curveType: 'function',
        legend: 'none',
        colors: ['#2b2b2b'],
        curveType: 'function',
        hAxis: { textPosition: 'none', gridlines: {count: 0} },
        vAxis: { textPosition: 'none', gridlines: {count: 0} },
        chartArea: {'width': '100%', 'height': '100%'},
        
    };

    var chart = new google.visualization.AreaChart(document.getElementById('curve_chart2'));

    chart.draw(data, options);

}