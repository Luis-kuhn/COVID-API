$(document).ready(function(){
    
    reload();

	// Ativa Tooltip
	$('[data-toggle="tooltip"]').tooltip();

    //$("#taskModal").modal('show');
    
    var selectedEmployee;

    var selectedEmployeesIds = [];

	// Seleciona e Deseleciona Checkboxes o clicar em selecionar todas
	$("#selectAll").click(function(){

        var checkbox = $('input[type="checkbox"]');

		if(this.checked){

			checkbox.each(function(){

				this.checked = true;              

			});

		} else{

			checkbox.each(function(){

                this.checked = false;       
                
                selectedEmployeesIds = [];

			});

		} 

	});

	$(document).on('click', '[type="checkbox"]', function(e) {

        if(!this.checked){

			$("#selectAll").prop("checked", false);

		}

        $('#countChecked').empty().append('(' + $("[type='checkbox']:checked").not("#selectAll").length + ')');

    });

    // Recarrega todos os registros.
    function reload() {

        $('#dataTable').empty();

        selectedEmployeesIds = [];
        
        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/paises",
            type: "GET",
            
            success: function(result){
                console.log(result);
                
                $.each(result, function(index, value) {
                    window.value
                    $('#dataTable').append(
                    '<tr>'+
                        '<td>'+
                            '<span class="custom-checkbox">'+
                                '<input type="checkbox" id="' + value.id + '" name="options[]" value="' + value.id + '">'+
                                '<label for="' + value.id + '"></label>'+
                            '</span>'+
                        '</td>'+

    
                        '<td data-nome="'+value.id+'">'+value.nome_pais+'</td>'+
                        '<td>'+value.mortes+'</td>'+
                        '<td>'+value.confirmados+'</td>'+
                        '<td>'+value.Recuperados+'</td>'+
    
                        
                        '<td>'+
                            '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                        '</td>'+
                    '</tr>')
    
                });
    
           }
        
        });

    }

    // Trata a requisição ao clicar em "Adicionar" dentro do "Adicionar Nova dica"
    $(document).on('click', '#addCards', function(e) {

        e.preventDefault;
        debugger
        var newDica = {

            "nome_pais": $("#addPaises").val(),
            "mortes": $("#addMortes").val(),
            "confirmados": $("#addConfirmados").val(),
            "recuperados": $("#addRecuperados").val(),
            
        };

        var data1 = JSON.stringify(newDica);

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/paises",
            type: "POST",
            complete: function(xhr) {
                $('#addCardsModal').modal('hide');

                if(xhr.status === 200) {

                    reload();

                    $('#alreadyAddedCardsModal .modal-body').empty().append('<p>Os registros do '+ newDica['nome_pais'] + ' foram salvos com sucesso!</p></br><a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake Add"></i></a> Fake Add:</br>Status: ' + xhr.status)

                    $("#alreadyAddedCardsModal").modal('show');

                    addFake(newDica);

                }
            }, 
            success: function(result){

                $('#addCardsModal').modal('hide');

                reload();

                $('#alreadyAddedCardsModal .modal-body').empty().append('<p>Os registros de '+ newDica['nome_pais'] + ' foram salvos com sucesso!</p>')

                $("#alreadyAddedCardsModal").modal('show');
                                                           
            },
       
        });

    });


    // Trata a requisição ao clicar no "Ícone de Lápis"
    $(document).on('click', '.edit', function(e) {

        e.preventDefault;
        window.id = $(this).closest('tr').find('td[data-nome]').data('nome');

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/paises" +  window.id,
            type: "GET",
            
            complete: function(result){

                getIdFake(window.id, "EDIT")
                          
            },

        
        });

    });

    // Trata a requisição ao clicar no botão "Salvar" dentro do "Ícone de Lápis"
    $(document).on('click', '#editCards', function(e) {

        var newCard = {
            "nome_pais": $("#editPaises").val(),
            "mortes": $("#editMortes").val(),
            "confirmados": $("#editConfirmados").val(),
            "recuperados": $("#editRecuperados").val(),
        };

        var data1 = JSON.stringify(newCard);

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/put/" +  window.id,
            type: "PUT",
            
            complete: function(xhr, result){

                $('#editCardsModal').modal('hide');

                reload();

                $('#alreadyEditedCardsModal .modal-body').empty().append('<p>Os registros de '+ newCard.nome_pais + ' foram atualizados com sucesso!</p> '+
                '</br><a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake EDIT"></i></a> Fake Add:</br>Status: ' + xhr.status)

                
                $("#alreadyEditedCardsModal").modal('show');

                $(this).parents("tr").remove();

                addFake(newCard)

            }

        });

    });

    
//apenas para demontrar a API fake


function addFake(value) {
    debugger
    $('#dataTable').append(
        '<tr>'+
            '<td>'+
                '<span class="custom-checkbox">'+
                    '<input type="checkbox" id="' + value.id + '" name="options[]" value="' + value.id + '">'+
                    '<label for="' + value.id + '"></label>'+
                '</span>'+
            '</td>'+


            '<td data-nome="'+value.id+'">'+value.nome_pais+'</td>'+
            '<td>'+value.mortes+'</td>'+
            '<td>'+value.confirmados+'</td>'+
            '<td>'+value.recuperados+'</td>'+

            
            '<td>'+
                '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                '<a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake Add"></i></a>'+
            '</td>'+
        '</tr>')
}


async function getIdFake(id) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.length; i++) {

                    var dica = objetoRetornado[i];

                    if (dica.id == id) {
                        
                        
                        dataDica = dica
                        $('#editCardsModal').modal('show');

                        $('#editCardsModal .modal-title').empty().append('<p>Editar</p>');

                        $("#editPaises").val(dica.nome_pais);
                        $("#editMortes").val(dica.mortes);
                        $("#editConfirmados").val(dica.confirmados);
                        $("#editRecuperados").val(dica.Recuperados);                        

                    }
                    
                }

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/paises", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send(); 


}
})
