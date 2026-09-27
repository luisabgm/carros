const carros = [];

function cadastrarCarro() {
  const formulario = document.getElementById("form");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); //quando precisar cancelar o comportamento padrão que o navegador executa automaticamente para um determinado elemento ao disparar um evento
    //Para impedir que a página seja atualizada ou recarregada ao enviar um formulário, permitindo processar os dados via JavaScript - como em requisições

    let nome = document.getElementById("name").value;
    let ano = document.getElementById("year").value;
    let km_litro = document.getElementById("km_litro").value;
    let img = `<img data-ci-make="${nome}" data-ci-year="${ano}"/>`;

    const carro = {
      nome: nome,
      ano: ano,
      km_litro: km_litro,
      img: img,
    };

    if (!nome) {
      console.log("O nome deve ser preenchido");
      return;
    } else if (ano == null) {
      console.log("O ano deve ser preenchido");
      return;
    } else if (km_litro == null) {
      console.log("Quantos km por litro deve ser preenchido");
      return;
    }

    console.log("Carro cadastrado");
    // document.getElementById("status-msg").textContent = "Carro cadastrado";
    alert("O carro foi cadastrado!");

    carros.push(carro);

    for (let i = 0; i <= carros.length - 1; i++) {
      console.log(carros[i].nome);
    }

    /* for (let i = 0; i <= carros.length - 1; i++) {
        if (nome == carros[i].nome && ano == carros[i].ano) {
          console.log("Esse carro já está cadastrado");
          return;
        }
      } 
*/
    /*document.getElementById("container").innerHTML +=
                `<img data-ci-make="${nome}" data-ci-year="${ano}" />`;*/

    window.localStorage.setItem(
      "carrosCadastrados",
      JSON.stringify({ carros }),
    ); //armazena os dados de uma pagina no localStorage

    formulario.reset(); //Limpa os campos do formulário para o próximo cadastro

    listarCarros();
  });
}

function calcularDistancia() {
  let dadosSalvos = window.localStorage.getItem("carrosCadastrados");

  let data = JSON.parse(dadosSalvos);

  console.log(data);

  let carros = data.carros;

  // // guarda a variavel nome do carro em letras minusculas,
                                           //  p achar o carro mesmo que o seu nome seja digitado com letra minuscula. case insensitive

  let nome = document.getElementById("name_calc").value;
  
  let litros_tanque = document.getElementById("litros_tanque").value;

  //nome = String(carros.nome).toLowerCase();

  //const nome = prompt("Digite o nome do carro");

  let distancia;

  /*const litros_tanque = prompt(
    "Digite quantos litros de gasolina tem no tanque",
  );
*/
  let i;

  if (!nome) {
    alert("Informe o nome do carro");
    return;
  } else if (litros_tanque == 0) {
    alert("A distancia que pode ser percorrida é de: 0");
    return;
  } else if (!litros_tanque) {
    alert("Informe quantos litros há no tanque");
    return;
  }
  console.log("Aqui", dadosSalvos, dadosSalvos.length);

  for (let i = 0; i < carros.length - 1; i++) {
    console.log(carros[i]);
  }

  /* for (i = 0; i < dadosSalvos.length; i++) {
    console.log(i);

   if (nome == carros[i].nome) {
      break;
    }
  }*/

  let carroEncontrado = null;

  for (let i = 0; i < carros.length; i++) {
    if (nome == carros[i].nome) {
      carroEncontrado = carros[i];
      break; // Exit loop immediately when found
    }
  }

  if (carroEncontrado) {
    let distancia = Number(carroEncontrado.km_litro) * Number(litros_tanque);
    alert(" A distancia que pode ser percorrida é de: " + distancia);
  } else {
    alert("Carro não cadastrado");
  }

  if (nome == carros[i].nome) {
    distancia = Number(carros[i].km_litro) * Number(litros_tanque);
    console.log(distancia);
    console.log(Number(carros[i].km_litro), Number(litros_tanque));

    alert(" A distancia que pode ser percorrida é de: " + distancia);
  } else {
    alert("Carro não cadastrado");
    return;
  }

  document.getElementById("valorDistancia").textContent =
    "A distancia que pode ser percorrida é de: " + distancia;
}

let lista;

function listarCarros() {
  // Primeiro cria uma variável pra segurar o lugar da tabela lá do HTML.
  // O getElementById é tipo ir apontando pro id "corpoTabela" pra saber onde mexer.

  // const corpoTabela = ;

  let dadosSalvos = window.localStorage.getItem("carrosCadastrados");

  let data = JSON.parse(dadosSalvos);

  console.log(data);

  console.log(data.carros);
  console.log(data.carros[0]);

  let lista = data.carros;

  console.log(lista);

  for (i = 0; i <= lista.length; i++) {
    console.log(lista[i]);


   if (document.getElementById(`${lista[i].nome}_${lista[i].ano}`)) {
      console.log("aqui");
      continue
    }

     
/*
      document.getElementById("corpoTabela").innerHTML += `

                  
      <tr id="${lista[i].nome}_${lista[i].ano}" class="p-4 border-b border-blue-gray-50">
        <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].nome}</p></td>
        <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].ano}</p></td>
        <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].km_litro}</p></td>
        <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].img}</p></td>
          <td class="p-4 border-b border-blue-gray-50"> <button onclick="removerCarro('${lista[i].nome}', '${lista[i].ano}')">Deletar</button></td>
      </tr>
     

      `;*/


    


    
    
   
     

      //continue; // para o loop atual e segue os próximos, ao contrário de break que para tudo

      // Aqui o += serve pra somar, adicionar uma linha nova sem apagar as que já tavam lá.
      // Essa crase ` abre a template string, que permite escrever HTML normal e colocar variáveis no meio.

      document.getElementById("corpoTabela").innerHTML += `

                  
                  <tr id="${lista[i].nome}_${lista[i].ano}" class="p-4 border-b border-blue-gray-50">
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].nome}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].ano}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].km_litro}</p></td>
                    <td class="p-4 border-b border-blue-gray-50"><p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">${lista[i].img}</p></td>
                      <td class="p-4 border-b border-blue-gray-50"> <button onclick="removerCarro('${lista[i].nome}', '${lista[i].ano}')">Deletar</button></td>
                  </tr>
                 

                  `;
                  
    }

    listarCarros();
  }

    
  

  function removerCarro(nome, ano) {
    console.log(nome);

    let dadosSalvos = window.localStorage.getItem("carrosCadastrados");

    let data = JSON.parse(dadosSalvos);
  
    console.log(data);
  
    console.log(data.carros);
    console.log(data.carros[0]);
  
    const lista = data.carros;
  
    console.log(lista);

    for (i = 0; i < lista.length; i++) {
      if (lista[i].nome == nome && lista[i].ano == ano) {
        lista.splice(i, 1);
        document.getElementById(`${nome}_${ano}`).remove();
        break;
      }
    }

    //listarCarros();
  }


/*function submitButton() {
  const formulario = document.getElementById("form");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); //quando precisar cancelar o comportamento padrão que o navegador executa automaticamente para um determinado elemento ao disparar um evento
    //Para impedir que a página seja atualizada ou recarregada ao enviar um formulário, permitindo processar os dados via JavaScript - como em requisições

    const dados = new FormData(formulario);

    const dadosCarro = Object.fromEntries(FormData.entries());

    carros.push(dadosCarro); //adiciona os dados do carro cadastrado vindo do form

    formulario.reset(); //Limpa os campos do formulário para o próximo cadastro

    listarCarros();

    const carro = {
      nome: nome,
      ano: ano,
      km_litro: km_litro,
      img: img,
    };
  });*/
