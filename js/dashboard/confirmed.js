google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartConfirmed);

function drawChartConfirmed() {



    list = [['Pais', 'Casos']]

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.length; i++) {

                    var dica = objetoRetornado[i];
                    

                    list.push([dica.nome_pais, dica.confirmados])


                }

                var data = google.visualization.arrayToDataTable(list);

                var options = {
                    curveType: 'function',
                    legend: 'none',
                    colors: ['#ff2e2e'],
                    curveType: 'function',
                    hAxis: { textPosition: 'none', gridlines: {count: 0} },
                    vAxis: { textPosition: 'none', gridlines: {count: 0} },
                    chartArea: {'width': '100%', 'height': '100%'},
                    
                };
            
                var chart = new google.visualization.AreaChart(document.getElementById('curve_chart3'));
            
                chart.draw(data, options);
                

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/paises", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send();






}