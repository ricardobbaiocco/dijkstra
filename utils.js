function buscarCidadesDoBancoDeDados() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "buscar_cidades.php");
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Erro na busca das cidades no banco de dados."));
      }
    };
    xhr.onerror = () => {
      reject(new Error("Erro na requisição AJAX."));
    };
    xhr.send();
  });
}
