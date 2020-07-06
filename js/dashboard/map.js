google.charts.load('current', {
    'packages':['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {



    list = [['Pais', 'Casos']]

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.length; i++) {

                    var dica = objetoRetornado[i];
                    

                    list.push([dica.nome_pais, (dica.confirmados *-1)])


                }

                var data = google.visualization.arrayToDataTable(list);

                var options = {
                        colorAxis: {colors: ['#e31b23', 'yellow', '#00853f']},
                        backgroundColor: '#81d4fa',
                        datalessRegionColor: '#f8bbd0',
                        defaultColor: '#f5f5f5',
                };
            
                var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
                chart.draw(data, options);
                

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/paises", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send();


};