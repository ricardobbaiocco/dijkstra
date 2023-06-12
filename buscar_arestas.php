<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Execute a query para buscar as informações das arestas no banco de dados
  $query = "SELECT * FROM arestas";
  $resultado = $conexao->query($query);

  // Verifique se houve resultados
  if ($resultado->num_rows > 0) {
    // Crie um array para armazenar as informações das arestas
    $arestas = array();

    // Percorra os resultados e adicione as informações das arestas ao array
    while ($row = $resultado->fetch_assoc()) {
      $arestas[] = array(
        'origem' => $row['cidade_origem'],
        'destino' => $row['cidade_destino'],
        'peso' => $row['peso']
      );
    }

    // Converta o array em formato JSON e retorne a resposta
    header('Content-Type: application/json');
    echo json_encode($arestas);
  } else {
    // Não foram encontradas arestas, retorne uma resposta vazia
    echo '[]';
  }

  // Feche a conexão com o banco de dados
  $conexao->close();
}
?>
