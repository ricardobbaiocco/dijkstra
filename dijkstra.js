
// Criação da função dijkstra - INÍCIO
function dijkstra(grafo, origem, destino) { //função dijkstra recebe três parametros e encontrar o menor caminho em um grafo ponderado
  let menorCaminho = null; // Variável para armazenar o menor caminho encontrado
  let somaPesos = Infinity; // Variável para armazenar a soma dos pesos das arestas

  class PriorityQueue { // classe será usada para implementar uma fila de prioridade
    constructor() {
      this.queue = [];
    }
    // Adiciona um elemento à fila de prioridade com base no peso
    enqueue(element) { //inicializa propriedade queue como um array vazio para armazenar os elementos da fila
      if (this.isEmpty()) { //verifica se a fila está vazia, Se estiver vazia, o element é  adicionado ao final da fila usando this.queue.push(element)
        this.queue.push(element);
      } else {  //é inserido em sua posição correta na fila com base em seu peso
        let added = false; // é usada para indicar se o element foi adicionado à fila.
        for (let i = 0; i < this.queue.length; i++) { //percorre os elementos existentes na fila, se o peso do element for menor, ele é inserido antes do elemento atual 
          if (element.peso < this.queue[i].peso) { //Para cada elemento na fila, é verificado se o peso do elemento que está sendo adicionado (element.peso) é menor do que o peso do elemento atual na fila 
            this.queue.splice(i, 0, element); //o método splice é usado para adicionar o elemento na posição i da fila. O argumento 0 faz a substituição sem remover
            added = true; //usada para indicar que o elemento foi adicionado
            break;
          }
        }
        if (!added) { // se o elemento tiver o maior peso até agora a variavel added continua false
          this.queue.push(element); // e adiciona no final da fila
        }
      }
    }
    //resumo: garante que os elementos sejam adicionados à fila em ordem crescente com base no peso

    // Remove e retorna o elemento de maior prioridade da fila
    dequeue() {  //O método dequeue é usado para remover o elemento om menor peso da fila
      if (!this.isEmpty()) {
        return this.queue.shift();
      }
      return null;
    }

    //metodo isEmpty é usado para verificar se a fila está vazia antes de realizar operações de remoção
    isEmpty() {
      return this.queue.length === 0;
    }
  } 

  // Função para buscar os caminhos a partir de uma cidade atual
function buscaCaminhos(atual, caminho, peso) {
  const fila = new PriorityQueue(); // Fila de prioridade para explorar os vizinhos
  fila.enqueue({ cidade: atual, caminho: caminho.slice(), peso: peso }); // Adiciona o primeiro elemento à fila

  while (!fila.isEmpty()) { // Enquanto a fila não estiver vazia
    const { cidade, caminho, peso } = fila.dequeue(); // Remove o elemento de maior prioridade da fila

    // Verifica se chegou ao destino
    if (cidade === destino) {
      menorCaminho = caminho; // Atualiza o menor caminho encontrado
      somaPesos = peso; // Atualiza a soma dos pesos das arestas
      break; // Encontrou o destino, encerra a busca
    }

    // Verifica se a cidade já está no caminho atual
    if (caminho.indexOf(cidade) === -1) { //se a cidade não estiver no caminho atual ela pode ser adicionada
      caminho.push(cidade); // Adiciona a cidade ao caminho atual

      const vizinhos = grafo[cidade]; //recebe um objeto que representa os vizinhos da cidade atual no grafo
      for (let vizinho in vizinhos) { //percorre todos os vizinhos da cidade atual
        const novoPeso = peso + vizinhos[vizinho]; // soma os pesos com os pesos acumulados até o momento 
        fila.enqueue({ cidade: vizinho, caminho: caminho.slice(), peso: novoPeso }); // Adiciona os vizinhos à fila com o novo peso
      }
      caminho.pop(); // Remove a cidade do caminho atual para explorar outros caminhos
    }
  }
}
  // Inicializa a busca a partir da cidade de origem
  //inicia a exploração do grafo a partir da cidade de origem, buscando o menor caminho até o destino
  buscaCaminhos(origem, [], 0);

  // Retorna o menor caminho encontrado e a soma dos pesos das arestas
  return { caminho: menorCaminho, somaPesos };
}
// Criação da função dijkstra - FIM





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
