<?php
// Estabelecer conexão com o banco de dados
require_once 'conexao.php';

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Obter os dados do formulário
  $origem = $_POST['origem'];
  $destino = $_POST['destino'];
  $peso = $_POST['peso'];

  // Preparar a consulta SQL para inserir a aresta no banco de dados
  $query = "INSERT INTO arestas (cidade_origem, cidade_destino, peso) VALUES ('$origem', '$destino', $peso)";
  $query2 = "INSERT INTO arestas (cidade_origem, cidade_destino, peso) VALUES ('$destino', '$origem', $peso)";

  // Verificar se a aresta já existe
  $checkQuery = "SELECT * FROM arestas WHERE cidade_origem = '$origem' AND cidade_destino = '$destino'";
  $checkResult = $conexao->query($checkQuery);

  if ($checkResult->num_rows > 0) {
    echo 'Aresta já cadastrada.';
  } else {
    // Executar a consulta SQL
    if ($conexao->query($query) === TRUE && $conexao->query($query2) === TRUE) {
      echo 'Aresta cadastrada com sucesso.';
    } else {
      echo 'Erro ao cadastrar aresta: ' . $conexao->error;
    }
  }
}
?>
