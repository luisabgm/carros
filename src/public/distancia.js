const resultado = document.getElementById("valorDistancia"); // coloque o ID correto da sua div

async function buscarCarros() {
  const resposta = await fetch("http://localhost:3000/src/api/carros");
  const data = await resposta.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    console.log("inicio do for");

    document.getElementById("form-select-distance").innerHTML += `
             <option value="${data[i]._id}">${data[i].nome},${data[i].ano}</option>  
   `;
  }
}

buscarCarros();

async function mostrarResultado(mensagem) {
  // textContent escreve o texto dentro da caixa de resultado
  resultado.innerHTML = mensagem;
  

  // A classe "hidden" deixa o elemento invisível.
  // Ao removê-la, a caixa aparece na página.
  resultado.classList.remove("hidden");
}

async function Api() {
  

  let carId = document.getElementById("form-select-distance").value;

  //const resultado = document.getElementById("valorDistancia");

  const litros = Number(document.getElementById("litros_tanque").value);

  // Se o campo do nome estiver vazio, não é possível procurar o carro
  if (!carId) {
    // Mostra uma orientação para a pessoa preencher o campo
    mostrarResultado("Informe o nome do carro.");

    // return encerra a função para que o cálculo não continue com dados incompletos
    return;
  }

  if (!Number.isFinite(litros) || litros < 0) {
    // Number.isFinite verifica se litros é um número válido
    // Também não aceita números menores que zero, pois não existem litros negativos

    mostrarResultado("Informe uma quantidade válida de litros no tanque."); // Mostra uma mensagem explicando o que precisa ser corrigido.
    return;
  }

 
  // Se find não encontrou nenhum carro, carroEncontrado terá o valor undefined.
  if (!carId) {
    mostrarResultado("Carro não cadastrado.");
    return;
  }
  let resposta

  try {
    console.log("modelo:", carId);
    console.log("litros:", litros);
    resposta = await fetch("http://localhost:3000/src/api/distancia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carId, litros }),
    });

    

    //formulario.reset(); //Limpa os campos do formulário para o próximo cadastro
  } catch (erro) {
    alert("Erro ao conectar com o servidor.");
    console.error(erro);
  }

  const dados = await resposta.json();

  console.log("a",dados)

  if (!dados) {
    mostrarResultado("Nenhum carro foi cadastrado ainda.");
    return;
  }

  // km_litro informa quantos quilômetros o carro percorre com 1 litro.
  // Multiplicamos esse valor pela quantidade de litros para descobrir a distância total.
  /*const consumo = consumoPorVelocidade();

let distancia = consumo * dados.litros;*/

if(dados.resultado.length == 0){
  mostrarResultado(`A distância desse carro não foi cadastrada`)
  return
}



  mostrarResultado(
     `Em uma velocidade média entre 40 e 60 km/h, a autonomia estimada é de ${dados.resultado[0]} km. <br><br> ` + 
    `Em uma velocidade média entre 60 e 80 km/h, a autonomia estimada é de ${dados.resultado[1]} km. <br><br> ` + 
     `Em uma velocidade média entre 80 e 100 km/h, a autonomia estimada é de ${dados.resultado[2]} km. <br><br> `+
      `Em uma velocidade média entre 100 e 120 km/h, a autonomia estimada é de ${dados.resultado[3]} km. <br><br> `+
       `Em uma velocidade média entre 120 e 140 km/h, a autonomia estimada é de ${dados.resultado[4]} km. <br><br> `+
        `Para outras velocidades, a autonomia estimada é de ${dados.resultado[5]} km. <br> `
        
   
   
  
   



    


    
  );
}
