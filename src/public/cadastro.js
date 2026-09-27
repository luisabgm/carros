let Novoscarros = [];

function cadastrarCarro() {
  const formulario = document.querySelector("#form");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault(); //quando precisar cancelar o comportamento padrão que o navegador executa automaticamente para um determinado elemento ao disparar um evento
    //Para impedir que a página seja atualizada ou recarregada ao enviar um formulário, permitindo processar os dados via JavaScript - como em requisições

    const nome = formulario.name.value.trim();
    let ano = formulario.year.value.trim();
    let marca = formulario.marca.value.trim();
    let km_litro = formulario.km_litro.value.trim();
    let img = `<img 
        data-ci-make="${marca}"
        data-ci-model="${nome}"
        data-ci-year="${ano}"
    />`;

    const carro = {
      nome: nome,
      ano: ano,
      marca: marca,
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

    Novoscarros.push(carro);

    for (let i = 0; i <= Novoscarros.length - 1; i++) {
      console.log(Novoscarros[i].nome);
    }

    /* for (let i = 0; i <= Novoscarros.length - 1; i++) {
          if (nome == Novoscarros[i].nome && ano == Novoscarros[i].ano) {
            console.log("Esse carro já está cadastrado");
            return;
          }
        } 
  */
    /*document.getElementById("container").innerHTML +=
                  `<img data-ci-make="${nome}" data-ci-year="${ano}" />`;*/
    console.log({ Novoscarros });

    /* const carrosAnterioresTexto = window.localStorage.getItem(
      "carrosCadastrados",
    )*/

    const carrosAnterioresTexto = JSON.stringify(carro, null, 2);


    const carrosAnterioresObj = JSON.parse(carrosAnterioresTexto);

    const todosCarros = [carrosAnterioresObj.carros, ...Novoscarros]; // "..." passa os dados do vetor de dentro p o vetor de fora

    try {
      const resposta = await fetch('http://localhost:3000/src/api/carros', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({carro}),
      });

      formulario.reset(); //Limpa os campos do formulário para o próximo cadastro

    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
      console.error(erro);

    }

    /* window.localStorage.setItem(
      "carrosCadastrados",
      JSON.stringify({ carros: todosCarros }), //carros recebe os valores de todos os carros
    ); //armazena os dados de uma pagina no localStorage*/

    
  });
}
