<?php
// Estabelecer conexão com o banco de dados
require_once 'conexao.php';

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Obter o nome da cidade do formulário
  $nome = $_POST['nome'];

  // Preparar a consulta SQL para inserir a cidade no banco de dados
  $query = "INSERT INTO cidades (nome) VALUES ('$nome')";

  // Executar a consulta SQL
  if ($conexao->query($query) === TRUE) {
    echo 'Cidade cadastrada com sucesso.';
  } else {
    echo 'Erro ao cadastrar cidade: ' . $conexao->error;
  }
}
?>
