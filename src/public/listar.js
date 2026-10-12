async function filters() {
  const resposta = await fetch("http://localhost:3000/src/api/carros");
  const data = await resposta.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    console.log("inicio do for");

    document.getElementById("yearFilter").innerHTML += `
             <option value="${data[i].ano}">${data[i].ano}</option>  
   `;

    document.getElementById("brandFilter").innerHTML += `
   <option value="${data[i].marca}">${data[i].marca}</option>  
`;
  }
}

filters();

/*function filtrarCarro() {
  const formulario = document.querySelector("#form");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault(); //quando precisar cancelar o comportamento padrão que o navegador executa automaticamente para um determinado elemento ao disparar um evento
                            //Para impedir que a página seja atualizada ou recarregada ao enviar um formulário, permitindo processar os dados via JavaScript - como em requisições

    const nome = formulario.nameFilter.value.trim();
    let ano = formulario.yearFilter.value;
    let marca = formulario.brandFilter.value;

    try {
      const resposta = await fetch(`http://localhost:3000/src/api/carros?nome=${nome}&ano=${ano}&marca=${marca}`,  {
      const data = await resposta.json();

    } catch (erro) {
      console.error("Erro ao renderizar os dados no HTML:", erro);
    }
      
  }

  });
})
  listarCarros()
}*/

function filtrarCarro() {
  const formulario = document.querySelector("form");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    console.log(evento);

    const nome = formulario.nameFilter.value.trim();
    let ano = formulario.yearFilter.value;
    let marca = formulario.brandFilter.value;

    try {
      const resposta = await fetch(
        `http://localhost:3000/src/api/carros?nome=${nome}&ano=${ano}&marca=${marca}`,
      );
      const data = await resposta.json();

      // Agora passamos os dados filtrados diretamente para a função que desenha a tela
      listarCarros(data);
    } catch (erro) {
      console.error("Erro ao filtrar carro(s):", erro);
    }
  });
}
filtrarCarro();

// Alteração aqui: Adicionado o parâmetro "carrosFiltrados" com valor padrão null
async function listarCarros(carrosFiltrados = null) {
  try {
    let data;

    // Se a função recebeu carros filtrados do botão de submit, usa eles.
    // Se NÃO recebeu (carregamento inicial da página), faz o fetch padrão.
    if (carrosFiltrados) {
      data = carrosFiltrados;
    } else {
      let resposta = await fetch("http://localhost:3000/src/api/carros");
      data = await resposta.json();
    }

    // LIMPA A TABELA ANTES DE RENDERIZAR: Se não limpar, os carros novos vão se acumular
    document.getElementById("corpoTabela").innerHTML = "";

    console.log("Aquia data:", data);

    // CORREÇÃO: Mudado de '<=' para '<' para não estourar o tamanho do array
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      if (
        !data[i]?.nome &
        !data[i]?.ano &
        !data[i]?.marca &
        document.getElementById(`${data[i]._id}`)
      ) {
        console.log("aqui");
        continue;
      }

      document.getElementById("corpoTabela").innerHTML += `
                  <tr id="${data[i]._id}" class="p-4 border-b border-blue-gray-50">
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].nome}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].ano}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].marca}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].km_litro}</p></td>
                    <td id="img_tabela" class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${data[i].img}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"> <button onclick="removerCarro('${data[i]._id}')">Deletar</button></td>
                    <td class="p-4 border-b border-blue-gray-50"> <button onclick="window.location.href='updateCar.html?id=${data[i]._id}'">Editar</button></td>
                   
                     
                  `;

      console.log("Aqui", i);
    }
  } catch (erro) {
    console.error("Erro ao renderizar os dados no HTML:", erro);
  }
}

async function removerCarro(id) {
  try {
    let resposta = await fetch(`http://localhost:3000/src/api/carros/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      document.getElementById(id).remove(); // Remove a linha do carro que já estava aparecendo na tabela.
    }
  } catch (erro) {
    console.error(erro);
  }
}



listarCarros();
