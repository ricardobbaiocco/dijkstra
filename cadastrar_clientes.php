<?php
// Estabelecer conexão com o banco de dados
require_once 'conexao.php';

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Obter os dados do formulário
  $nome = $_GET['nome'];
  $cpf = $_GET['cpf'];
  $cep = $_GET['cep'];
  $rua = $_GET['rua'];
  $ibge = $_GET['ibge'];
  $bairro = $_GET['bairro'];
  $cidade = $_GET['cidade'];
  $uf = $_GET['uf'];

  // Preparar a consulta SQL para inserir os dados no banco de dados
  $query = "INSERT INTO clientes (nome, cpf, cep, rua, ibge, bairro, cidade, uf) VALUES ('$nome', '$cpf', '$cep', '$rua', '$ibge', '$bairro', '$cidade', '$uf')";

  // Executar a consulta SQL
  if ($conexao->query($query) === TRUE) {
    echo 'Cliente cadastrado com sucesso.';
  } else {
    echo 'Erro ao cadastrar cliente: ' . $conexao->error;
  }
}
?>
