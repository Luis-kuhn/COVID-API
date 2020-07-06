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
            url: "https://private-78a09-paises1.apiary-mock.com/dicas",
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

                        '<td style="width: 40px">'+
    
                            '<span class="custom-profile-image">'+
    
                            '<i class="'+value.icone+'"></i>'+
    
                            '</span>'+
    
                        '</td>'+
    
                        '<td data-nome="'+value.id+'">'+value.titulo+'</td>'+
                        '<td>'+value.descricao+'</td>'+
    
                        
                        '<td>'+
                            '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                            '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Excluir">&#xE872;</i></a>'+
                        '</td>'+
                    '</tr>')
    
                });
    
           }
        
        });

    }

    // Trata a requisição ao clicar em "Adicionar" dentro do "Adicionar Nova dica"
    $(document).on('click', '#addCards', function(e) {

        e.preventDefault;

        var newDica = {

            "icone": $("#addIcon").val(),
            "titulo": $("#addTitle").val(),
            "descricao": $("#addText").val(),
            
        };

        var data1 = JSON.stringify(newDica);

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/dicas",
            type: "POST",
            complete: function(xhr) {
                $('#addCardsModal').modal('hide');

                if(xhr.status === 200) {

                    reload();

                    $('#alreadyAddedCardsModal .modal-body').empty().append('<p>Os registros de '+ newDica['titulo'] + ' foram salvos com sucesso!</p></br><a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake Add"></i></a> Fake Add:</br>Status: ' + xhr.status)

                    $("#alreadyAddedCardsModal").modal('show');

                    addFake(newDica);

                }
            }, 
            success: function(result){

                $('#addCardsModal').modal('hide');

                reload();

                $('#alreadyAddedCardsModal .modal-body').empty().append('<p>Os registros de '+ newDica['titulo'] + ' foram salvos com sucesso!</p>')

                $("#alreadyAddedCardsModal").modal('show');
                                                           
            },
       
        });

    });


    // Trata a requisição ao clicar no "Ícone de Lápis"
    $(document).on('click', '.edit', function(e) {

        e.preventDefault;
        window.id = $(this).closest('tr').find('td[data-nome]').data('nome');

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/dicas/" +  window.id,
            type: "GET",
            
            complete: function(result){

                getIdFake(window.id, "EDIT")
                          
            },

        
        });

    });

    // Trata a requisição ao clicar no botão "Salvar" dentro do "Ícone de Lápis"
    $(document).on('click', '#editCards', function(e) {

        var newCard = {
            "titulo": $("#editTitle").val(),
            "icone": $("#editIcon").val(),
            "descricao": $("#editText").val()
        };

        var data1 = JSON.stringify(newCard);

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/atualizar/" +  window.id,
            type: "PUT",
            
            complete: function(xhr, result){

                $('#editCardsModal').modal('hide');

                reload();

                $('#alreadyEditedCardsModal .modal-body').empty().append('<p>Os registros de '+ data1.titulo + ' foram atualizados com sucesso!</p> '+
                '</br><a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake EDIT"></i></a> Fake Add:</br>Status: ' + xhr.status)

                
                $("#alreadyEditedCardsModal").modal('show');

                $(this).parents("tr").remove();

                addFake(newCard)

            }

        });

    });
    

    // Trata a requisição ao clicar no "Ícone de Lixeira"
    $(document).on('click', '.delete', function(e) {

        e.preventDefault;
        window.id = $(this).closest('tr').find('td[data-nome]').data('nome');
        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/dicas/" + window.id ,
            type: "GET",
            
            complete: function(result){
                
                $('#deleteCardsModal').modal('show');

                $('#deleteCardsModal .modal-body').empty().append('<p>Você tem certeza que deseja excluir o registros de ' + '?</p>' +
                                                                                '<p class="text-warning"><small>Essa ação não pode ser desfeita.</small></p>')


                                                           
            }
        
        });

    });

    // Trata a requisição ao clicar no botao "Excluir" dentro do "Ícone de Lixeira"
    $(document).on('click', '#deleteCards', function(e) {

        $.ajax({
            url: "https://private-78a09-paises1.apiary-mock.com/delete/" + window.id,
            type: "DELETE",
            
            complete: function(xhr, result){

                $('#deleteCardsModal').modal('hide');

                reload();

                $('#alreadyDeletedCardsModal .modal-body').empty().append('<p>Os registros' + ' foram excluídos com sucesso!</p>'+
                '</br><a><i class="fas fa-exclamation-triangle" data-toggle="tooltip" title="Fake Add"></i></a> Fake DELETE:</br>Status: ' + xhr.status)

                $("#alreadyDeletedCardsModal").modal('show');

            }
        
        });

    });


//    // Trata a requisição ao clicar no botao "Excluir Selecionados"
//     $(document).on('click', '#deleteSeveralEmployees', function(e) {

//         selectedEmployeesIds = [];

//         $("[type='checkbox']:checked").not("#selectAll").each(function(value){

//             selectedEmployeesIds.push($(this).attr('id'));

//         });

//         console.log(selectedEmployeesIds);

//         $('#deleteSeveralEmployeesModal .modal-body').empty().append('<p>Você tem certeza que deseja excluir estes ' + selectedEmployeesIds.length + ' registro(s) selecionado(s)?</p>' +
//                                                                      '<p class="text-warning"><small>Essa ação não pode ser desfeita.</small></p>')

//     });

//     //Trata a requisição ao clicar no botao "Excluir" dentro do "Excluir Selecionados"
//     $(document).on('click', '#deleteSeveralEmployeesConfirm', function(e) {

//         $.each(selectedEmployeesIds, function( index, value ) {

//             $.ajax({
//                 url: "http://rest-api-employees.jmborges.site/api/v1/delete/" + value,
//                 type: "DELETE",

//                 success: function(result){

//                     console.log("Apagado");

//                 }
//             });

//         });

        
//         $('#deleteSeveralEmployeesModal').modal('hide');

//         setTimeout(reload, 2000);

//         $('#alreadyDeletedSeveralEmployeesModal .modal-body').empty().append('<p>Os  '+ selectedEmployeesIds.length + ' registros selecionados foram excluídos com sucesso!</p>')

//         $("#alreadyDeletedSeveralEmployeesModal").modal('show');


//     });

});
    
//apenas para demontrar a API fake


function addFake(value) {
    $('#dataTable').append(
        '<tr>'+
            '<td>'+
                '<span class="custom-checkbox">'+
                    '<input type="checkbox" id="' + value.id + '" name="options[]" value="' + value.id + '">'+
                    '<label for="' + value.id + '"></label>'+
                '</span>'+
            '</td>'+
    
            '<td style="width: 40px">'+
    
                '<span class="custom-profile-image">'+
    
                '<i class="'+value.icone+'"></i>'+
    
                '</span>'+
    
            '</td>'+
    
            '<td data-nome="'+value.id+'">'+value.titulo+'</td>'+
            '<td>'+value.descricao+'</td>'+
    
            
            '<td>'+
                '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Excluir">&#xE872;</i></a>'+
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

                        $("#editIcon").val(dica.icone);
                        $("#editTitle").val(dica.titulo);
                        $("#editText").val(dica.descricao);
                        

                    }
                    
                }

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/dicas", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send(); 


}




async function getIdFakeDelete(id) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.length; i++) {

                    var dica = objetoRetornado[i];

                    if (dica.id == id) {
                        
                        
                        $('#editCardsModal').modal('show');

                        $('#editCardsModal .modal-title').empty().append('<p>Editar</p>');

                        $("#editIcon").val(dica.icone);
                        $("#editTitle").val(dica.titulo);
                        $("#editText").val(dica.descricao);
                        

                    }
                    
                }

            } else {

            }

        }

    };

    xhttp.open ("GET", "https://private-78a09-paises1.apiary-mock.com/dicas", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send(); 


}

