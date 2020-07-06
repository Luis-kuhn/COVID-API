$(document).ready(function(){
   
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.length; i++) {

                    var dica = objetoRetornado[i];
                    
                    $('.card-holder').append(

                        '<div class="card">'+

                            '<i class="'+dica.icone+'"></i>'+

                            '<h2>'+dica.titulo+'</h2>'+

                            '<p>'+dica.descricao+'</p>'+

                        '</div>'
                    )
                }

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/dicas", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send();

})