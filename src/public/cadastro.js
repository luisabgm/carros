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

    try {
      const resposta = await fetch("http://localhost:3000/src/api/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carro),

        
      });

      if (!resposta.ok){
        const dadosErro = await resposta.json();
  
        alert(dadosErro.erro || "Ocorreu um erro ao salvar o carro")
        formulario.reset()
      }
  

      formulario.reset(); //Limpa os campos do formulário para o próximo cadastro
    } catch (erro) {
      alert("Erro ao conectar com o servidor.");
      console.error(erro);
    }



   


  });
}
