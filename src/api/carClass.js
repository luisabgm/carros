export default class Carro {
  constructor({ nome, ano, marca, km_litro }) {

    if (!nome) {
      console.log("O nome deve ser preenchido");
      throw new Error  ("O nome deve ser preenchido")
      
    } else if (ano == null) {
      console.log("O ano deve ser preenchido");
      throw new Error ("O ano deve ser preenchido")
     
    } else if (!marca || marca.trim() === "") {
      console.log("A marca deve ser preenchida");
      throw new Error("A marca deve ser preenchida")
      
    } else if (km_litro == null) {
      console.log("Quantos km por litro deve ser preenchido");
      throw new Error ("Quantos km por litro deve ser preenchido")
    }



    this.nome = nome;
    this.ano = ano;
    this.marca = marca;
    this.km_litro = km_litro;
  }

  calcularAutonomia(litros) {
    let fator;

    const velocidades = [40, 60, 80, 100, 120, 140, 1];

    const autonomias = [];

    for (const velocidade of velocidades) {
      if (velocidade == 40) {
        fator = 0.8;
      } else if (velocidade == 60) {
        fator = 0.9;
      } else if (velocidade == 80) {
        fator = 1;
      } else if (velocidade == 100) {
        fator = 0.9;
      } else if (velocidade == 120) {
        fator = 0.8;
      } else if (velocidade == 140) {
        fator = 0.7;
      } else {
        fator = 0.6;
      }

      const consumo = this.km_litro * fator;

      const distancia = consumo * litros;

      console.log(distancia);
      console.log(consumo);

      autonomias.push(distancia);
    }

    return autonomias;
  }
}
