
// Classe PriorityQueue
class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(element) {
    if (this.isEmpty()) {
      this.queue.push(element);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (element.peso < this.queue[i].peso) {
          this.queue.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push(element);
      }
    }
  }
  dequeue() {
    if (!this.isEmpty()) {
      return this.queue.shift();
    }
    return null;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

// Função dijkstra
function dijkstra(grafo, origem, destino) {
  let menorCaminho = null;
  let somaPesos = Infinity;
  function buscaCaminhos(atual, caminho, peso) {
    const fila = new PriorityQueue();
    fila.enqueue({ cidade: atual, caminho: caminho.slice(), peso: peso });
    while (!fila.isEmpty()) {
      const { cidade, caminho, peso } = fila.dequeue();
      if (cidade === destino) {
        menorCaminho = caminho;
        somaPesos = peso;
        break;
      }
      if (caminho.indexOf(cidade) === -1) {
        caminho.push(cidade);

        const vizinhos = grafo[cidade];
        for (let vizinho in vizinhos) {
          const novoPeso = peso + vizinhos[vizinho];
          fila.enqueue({ cidade: vizinho, caminho: caminho.slice(), peso: novoPeso });
        }
        caminho.pop();
      }
    }
  }
  buscaCaminhos(origem, [], 0);

  return { caminho: menorCaminho, somaPesos };
}

// Evento disparado quando o DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
  // Preenche as cidades nos selects de origem e destino
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



        
        // Função executada quando o botão de busca é clicado
        function executarDijkstra() {
          const cidadeOrigem = document.getElementById('cidadeOrigem').value;
          const cidadeDestino = document.getElementById('cidadeDestino').value;

          // Fazer a requisição AJAX para buscar o grafo do banco de dados
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'buscar_arestas.php', true);
          xhr.onload = function() {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              const grafo = {};

              // Monta o grafo a partir dos dados recebidos
              data.forEach(function(aresta) {
                if (!grafo[aresta.origem]) {
                  grafo[aresta.origem] = {};
                }

                grafo[aresta.origem][aresta.destino] = parseInt(aresta.peso);
              });

              const resultadoElemento = document.getElementById('resultado');
              const { caminho, somaPesos } = dijkstra(grafo, cidadeOrigem, cidadeDestino);

              if (caminho) {
                resultadoElemento.innerHTML = `Caminho mais curto de ${cidadeOrigem} a ${cidadeDestino}: ${caminho.join(' -> ') + ' -> ' + cidadeDestino}`;
                resultadoElemento.innerHTML += `<br> Com uma distância de: ${somaPesos} km<br><br>`;
              } else {
                resultadoElemento.textContent = 'Não foi possível encontrar um caminho.';
              }
            }
          };
          xhr.send();
        }

        var buscarButton = document.getElementById('buscarButton');
        buscarButton.addEventListener('click', executarDijkstra);
      }
    };
    xhr.send();
  }

  preencherCidades();
});
