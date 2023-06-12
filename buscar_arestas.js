document.addEventListener('DOMContentLoaded', function() {
  function preencherCidades() {
    var cidadeOrigemSelect = document.getElementById('cidadeOrigem');
    var cidadeDestinoSelect = document.getElementById('cidadeDestino');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'buscar_cidades.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        data.forEach(function(cidade) {
          var option = document.createElement('option');
          option.value = cidade;
          option.textContent = cidade;
          cidadeOrigemSelect.appendChild(option);

          var option2 = document.createElement('option');
          option2.value = cidade;
          option2.textContent = cidade;
          cidadeDestinoSelect.appendChild(option2);
        });
      }
    };
    xhr.send();
  }

  preencherCidades();

  // Função para exibir mensagem de sucesso após cadastrar aresta
  function exibirMensagem() {
    var resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = 'Aresta cadastrada com sucesso.';
  }

  // Preencher a tabela de arestas com os dados do servidor
  function preencherArestas() {
    var arestasTable = document.getElementById('arestasTable');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'buscar_arestas.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        data.forEach(function(aresta) {
          var row = document.createElement('tr');

          var origemCell = document.createElement('td');
          origemCell.textContent = aresta.origem;
          row.appendChild(origemCell);

          var destinoCell = document.createElement('td');
          destinoCell.textContent = aresta.destino;
          row.appendChild(destinoCell);

          var pesoCell = document.createElement('td');
          pesoCell.textContent = aresta.peso;
          row.appendChild(pesoCell);

          arestasTable.appendChild(row);
        });
      }
    };
    xhr.send();
  }

  preencherArestas();

  // Referência ao formulário de cadastro de arestas
  var cadastrarArestaForm = document.querySelector('form[action="cadastrar_arestas.php"]');
  cadastrarArestaForm.addEventListener('submit', exibirMensagem);
});
