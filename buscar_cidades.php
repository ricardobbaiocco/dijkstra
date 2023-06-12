<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Execute a query para buscar as cidades no banco de dados
  $query = "SELECT nome FROM cidades";
  $resultado = $conexao->query($query);

  // Verifique se houve resultados
  if ($resultado->num_rows > 0) {
    // Crie um array para armazenar os nomes das cidades
    $cidades = array();

    // Percorra os resultados e adicione os nomes das cidades ao array
    while ($row = $resultado->fetch_assoc()) {
      $cidades[] = $row['nome'];
    }

    // Converta o array em formato JSON e retorne a resposta
    header('Content-Type: application/json');
    echo json_encode($cidades);
  } else {
    // Não foram encontradas cidades, retorne uma resposta vazia
    echo '[]';
  }

  // Feche a conexão com o banco de dados
  $conexao->close();
}
?>
