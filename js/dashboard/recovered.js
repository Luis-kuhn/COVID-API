google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartRecovered);

function drawChartRecovered() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Recuperados'],
        ['01/01/2002',  1000],
        ['01/01/2002',  1170],
        ['01/01/2002',  302],
        ['01/01/2002',  1258],
        ['01/01/2002',  1938],
        ['01/01/2002',  233],
        ['01/01/2002',  9],
        ['01/01/2002',  1493],
        ['01/01/2002',  305],
        ['01/01/2002',  660],
        ['01/01/2002',  1030]
    ]);

    var options = {
        curveType: 'function',
        legend: 'none',
        colors: ['#00803c'],
        curveType: 'function',
        hAxis: { textPosition: 'none', gridlines: {count: 0} },
        vAxis: { textPosition: 'none', gridlines: {count: 0} },
        chartArea: {'width': '100%', 'height': '100%'},
        
    };

    var chart = new google.visualization.AreaChart(document.getElementById('curve_chart'));

    chart.draw(data, options);

}