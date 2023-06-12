$(document).ready(function() {
    $.ajax({
      url: 'buscar_cidades.php',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var cidadesTable = $('#cidadesTable');
  
        // Limpa o conteúdo da tabela
        cidadesTable.empty();
  
        // Adiciona as linhas com as cidades
        for (var i = 0; i < data.length; i++) {
          var cidade = data[i];
          var row = $('<tr><td>' + cidade + '</td></tr>');
          cidadesTable.append(row);
        }
      },
      error: function() {
        console.log('Erro ao buscar cidades.');
      }
    });
  });
  