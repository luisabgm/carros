// Esta função lê os carros salvos e monta uma linha da tabela para cada carro.
async function listarCarros() {
  try {
    let resposta = await fetch("http://localhost:3000/src/api/carros");
    let data = await resposta.json();

    console.log(data);

    for (let i = 0; i <= data.length; i++) {
      console.log(data[i]);

      // Procura se já existe na tabela uma linha com este nome e este ano.
      // `${...}` coloca valores de variáveis dentro de um texto.
      if (document.getElementById(`${data[i].nome}_${data[i].ano}`)) {
        console.log("aqui");
        continue; // para o loop atual e segue os próximos, ao contrário de break que para tudo
      }

      document.getElementById("corpoTabela").innerHTML += `

                  
                  <tr id="${data[i].nome}_${data[i].ano}" class="p-4 border-b border-blue-gray-50">
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].nome}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].ano}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].marca}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].km_litro}</p></td>
                    <td id="img_tabela" class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].img}</p></td>
                      <td class="p-4 border-b border-blue-gray-50"> <button onclick="removerCarro('${data[i].nome}', '${data[i].ano}')">Deletar</button></td>
                  </tr>
                 

                  `;

      console.log("Aqui", i);
    }
  } catch (erro) {
    console.error("Erro ao renderizar os dados no HTML:", erro);
  }
}

// Recebe o nome e o ano do carro que será apagado ao clicar em Deletar.
/*function removerCarro(nome, ano) {
  console.log(nome);

  // Busca novamente os carros salvos para alterar a lista correta.
  let dadosSalvos = await fetch("http://localhost:3000/src/api/carros").json;

  let data = JSON.parse(dadosSalvos);

  console.log(data);

  console.log(data.carros);
  console.log(data.carros[0]);

  // `const` indica que esta variável não receberá outra lista depois.
  //const data = data.carros;

  console.log(data);

  
  for (i = 0; i < data.length; i++) {                                                   // Procuramos o carro que tenha ao mesmo tempo o nome e o ano recebidos.
    if (data[i].nome == nome && data[i].ano == ano) {
      
      data.splice(i, 1);                                                                  // Tira o carro encontrado da data.

     
      window.localStorage.setItem("carrosCadastrados", JSON.stringify(data));           // Salva a lista nova no localStorage para o carro não voltar ao listar.

     
      document.getElementById(`${nome}_${ano}`).remove();                                // Remove a linha do carro que já estava aparecendo na tabela.
      
      break;                                                                              // `break` encerra o `for`, pq o carro já foi encontrado e removido.
    }
  }
}*/

listarCarros();
