//--------//--MARCA e ANO------//-------//

/*let data = window.localStorage.getItem("carrosCadastrados");

let data = JSON.parse(data);*/

let data = await fetch("http://localhost:3000/src/api/distancia").json;

// `carros` é a data que está dentro do objeto `data`.

console.log("antes do for");

for (i = 0; i < data.length; i++) {
  console.log("inicio do for");

  document.getElementById("form-select-distance").innerHTML += `
           <option value="${data[i].nome}-${data[i].ano}">${data[i].nome},${data[i].ano}</option>  
 `;
}
console.log("fim do for");
//--------//--FIM MARCA e ANO------//-------//

//------------Consumo por velocidade-----------------------------
function consumoPorVelocidade() {
  let fator;

  const velocidade = document.getElementById("velocidade").value;

  console.log("modelo")

  //const nome = data.nome;

  //let nome = data[i].nome 

  //let ano = 

 // (data[i].nome == nome && data[i].ano == ano)

  let modelo = document.getElementById("form-select-distance").value;

  console.log("modelo", modelo)





  console.log("for")

  for (i = 0; i < data.length; i++) {
    let km_litro = data[i].km_litro;
    console.log("Oi")

    

    if (modelo == `${data[i].nome}-${data[i].ano}`) {
      if (velocidade <= 40) {
        fator = 0.8;
      } else if (velocidade <= 60) {
        fator = 0.9;
      } else if (velocidade <= 80) {
        fator = 1;
      } else if (velocidade <= 100) {
        fator = 0.9;
      } else if (velocidade <= 120) {
        fator = 0.8;
      } else if (velocidade <= 140) {
        fator = 0.7;
      } else {
        fator = 0.6;
      }

      consumo = km_litro * fator;
      console.log("consumo")
      return consumo;

    }
  }
  // const litros = Number(document.getElementById("litros_tanque").value);
}
console.log("Oie")
//------------------Calculo distancia-----------------------

async function calcularDistancia() {
                                                                        // Procura no HTML a caixa onde o resultado será escrito.
                                                                        // O id "valorDistancia" é o nome que identifica essa caixa.
  const resultado = document.getElementById("valorDistancia");

                                                                        // Procura o campo em que a pessoa digitou o nome do carro.
                                                                        // value pega o texto digitado e trim() remove espaços no começo e no fim.
                                                                        //const nome = document.getElementById("name_calc").value.trim();

  let modelo = document.getElementById("form-select-distance").value;

                                                                        // Procura o campo dos litros e transforma o texto digitado em número.
                                                                        // Number("30"), por exemplo, se torna o número 30.
  const litros = Number(document.getElementById("litros_tanque").value);

                                                                        // Lê os carros cadastrados no localStorage do navegador.
                                                                        // O localStorage guarda dados mesmo depois que a página é fechada.
  data = window.localStorage.getItem("carrosCadastrados");

                                                                        // Esta pequena função evita repetir o mesmo código toda vez que precisarmos
                                                                        // mostrar uma mensagem para a pessoa usuária.
  function mostrarResultado(mensagem) {
                                                                        // textContent escreve o texto dentro da caixa de resultado.
    resultado.textContent = mensagem;

                                                                        // A classe "hidden" deixa o elemento invisível.
                                                                        // Ao removê-la, a caixa aparece na página.
    resultado.classList.remove("hidden");
  }

                                                                        // Se o campo do nome estiver vazio, não é possível procurar o carro.
  if (!modelo) {
                                                                        // Mostra uma orientação para a pessoa preencher o campo.
    mostrarResultado("Informe o nome do carro.");

                                                                        // return encerra a função para que o cálculo não continue com dados incompletos.
    return;
  }

  if (!Number.isFinite(litros) || litros < 0) {
                                                                        // Number.isFinite verifica se litros é um número válido.
                                                                        // Também não aceita números menores que zero, pois não existem litros negativos.

    mostrarResultado("Informe uma quantidade válida de litros no tanque."); // Mostra uma mensagem explicando o que precisa ser corrigido.
    return;
  }

                                                                          // Se não houver dados no localStorage, significa que nenhum carro foi salvo ainda.
  if (!data) {
    mostrarResultado("Nenhum carro foi cadastrado ainda.");
    return;
  }

                                                                          // JSON.parse transforma o texto salvo no localStorage novamente em objeto JavaScript.
  const dados = JSON.parse(data);

                                                                          // Pegamos a data de carros. O || [] usa uma data vazia caso "carros" não exista.
  const carros = dados.carros || [];

                                                                            // find percorre a data e devolve o primeiro carro que tiver o nome procurado.
                                                                            /*const carroEncontrado = carros.find(
                                                                              // toLowerCase deixa tudo em letras minúsculas.
                                                                              // Assim, "Gol", "gol" e "GOL" podem ser encontrados da mesma forma.
                                                                              (carro) => carro.nome.toLowerCase() === nome.toLowerCase(),
                                                                            );*/

                                                                            // Se find não encontrou nenhum carro, carroEncontrado terá o valor undefined.
  if (!modelo) {
    mostrarResultado("Carro não cadastrado.");
    return;
  }

                                                                            // km_litro informa quantos quilômetros o carro percorre com 1 litro.
                                                                            // Multiplicamos esse valor pela quantidade de litros para descobrir a distância total.
  let consumo = consumoPorVelocidade();

  let distancia = consumo * litros;
  
  try {
    const resposta = await fetch('http://localhost:3000/src/api/distancia', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data}),
    });

    formulario.reset(); //Limpa os campos do formulário para o próximo cadastro

  } catch (erro) {
    alert("Erro ao conectar com o servidor.");
    console.error(erro);

  }

 
  mostrarResultado(`A distância que pode ser percorrida é de ${distancia} km.`);
  return distancia



 
}
