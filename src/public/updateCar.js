//let carro

async function buscarCarroPorId(){

  

  let resposta = await fetch(`http://localhost:3000/src/api/carros/${window.location.search.split("=")[1]}`);
  const carro = await resposta.json();

  return carro


console.log("Buscar carro por id",carro)

}

function preencherDados(carro){

document.getElementById("name").value = carro.nome

document.getElementById("year").value = carro.ano
document.getElementById("marca").value = carro.marca
document.getElementById("km_litro").value = carro.km_litro

}

function mostrarBotaoEditar(carro) {

  console.log("O id do carro é: ", carro?._id);


  console.log(document.getElementById("EditBtn"))

  document.getElementById("EditBtn").innerHTML = `


<button
            type="submit"
            class="enviar inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-red-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
             onclick="editCar('${carro?._id}')"
          >
            Editar
          </button>
  
 
   
`;
}



async function editCar(id) {
  const formCarEdited = document.querySelector("#formUpdateCar");

  const nome = formCarEdited.name.value.trim();
  let ano = formCarEdited.year.value.trim();
  let marca = formCarEdited.marca.value.trim();
  let km_litro = formCarEdited.km_litro.value.trim();

  const editedCar = {
    nome: nome,
    ano: ano,
    marca: marca,
    km_litro: km_litro,
  };

  try {
    let resposta = await fetch(`http://localhost:3000/src/api/carros/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCar),
    });

    if (resposta.ok) {
      const carroAtualizado = await resposta.json();

      const carroAntigo = document.getElementById(id);

      if (carroAntigo) {
        const carroNovoHTML = document.createElement("div"); // mude para 'tr' se for tabela, 'li' se for lista, etc.
        carroNovoHTML.id = id;
        carroNovoHTML.innerHTML = `
          <h3>${carroAtualizado.nome}</h3>
          <p>Marca: ${carroAtualizado.marca}</p>
          <p>Ano: ${carroAtualizado.ano}</p>
        `;

        // 2. Agora sim substituímos na tela!
        carroAntigo.replaceWith(carroNovoHTML);

        alert("Carro atualizado com sucesso!");
      } else {
        console.error("Erro na resposta do servidor:", resposta.statusText);
      }
      /* if (resposta.ok) {
        document.getElementById(id).replaceWith(carroAtualizado);
      }*/
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}

async function inicializar(){

 const carro = await buscarCarroPorId()
  mostrarBotaoEditar(carro);
  preencherDados(carro)
}
inicializar()
