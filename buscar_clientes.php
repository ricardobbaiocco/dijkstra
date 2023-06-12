<?php
// Incluir o arquivo de conexão com o banco de dados
require_once 'conexao.php';

// Consulta SQL para obter os clientes
$query = "SELECT * FROM clientes";
$result = $conexao->query($query);

// Verificar se existem registros
if ($result->num_rows > 0) {
  echo "<table class='table'>";
  echo "<thead>";
  echo "<tr>";
  echo "<th>Nome</th>";
  echo "<th>CPF</th>";
  echo "<th>CEP</th>";
  echo "<th>Rua</th>";
  echo "<th>IBGE</th>";
  echo "<th>Bairro</th>";
  echo "<th>Cidade</th>";
  echo "<th>Estado</th>";
  echo "</tr>";
  echo "</thead>";
  echo "<tbody>";

  while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['nome'] . "</td>";
    echo "<td>" . $row['cpf'] . "</td>";
    echo "<td>" . $row['cep'] . "</td>";
    echo "<td>" . $row['rua'] . "</td>";
    echo "<td>" . $row['ibge'] . "</td>";
    echo "<td>" . $row['bairro'] . "</td>";
    echo "<td>" . $row['cidade'] . "</td>";
    echo "<td>" . $row['uf'] . "</td>";
    echo "</tr>";
  }

  echo "</tbody>";
  echo "</table>";
} else {
  echo "Nenhum cliente encontrado.";
}

// Fechar a conexão com o banco de dados
$conexao->close();
?>
