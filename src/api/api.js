import express from "express"; // busca a pasta express que está dentro de 'node_modules'
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express(); // dentro da variável app a gente tem todas as funcionalidades de 'express' --app geralmente é um nome dado à variavel api
const PORT = 3000;
const FILE_PATH = path.join(import.meta.dirname, "carros.json");
const FILE_PATH_DIST = path.join(import.meta.dirname, "distancia.json");

app.use(cors()); // Permite que o Live Server (porta 5500) acesse esta API

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/src/api/carros", (req, res) => {
  // req -> a rota que req vai receber - res -> a resposta que vai retornar res.send ou res.json para objetos em json

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao ler arquivo" });
    }

    const carros = JSON.parse(data || "[]");

    res.status(200).json(carros);
  });

  // res.status(200).json({Ok: "oi"})
}); //informar o que queremos fazer, em qual rota

/*app.delete("/src/api/carros", async (req, res) => {
  let carros = JSON.parse(fs.readFileSync("dados.json"));

  const i = carros.findIndex((carro) => carro.id === idParaRemover);

  if (i !== -1) {
    carros.splice(i, 1);

    fs.writeFile(FILE_PATH, JSON.stringify(carros, null, 2));
    console.log("Removido com sucesso!");
  } else {
    console.log("Carro não encontrado");
  }
});
*/


app.post("/src/api/carros", (req, res) => {
  const novoCarro = req.body;

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    let carros = [];

    if (!err && data) {
      carros = JSON.parse(data);
    }
    carros.push(novoCarro);

    fs.writeFile(FILE_PATH, JSON.stringify(carros, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ erro: "Erro ao salvar carro" });
      }
    });

    res.status(201).send();
  });
});


app.post("/src/api/distancia", (req, res) => {


  const dadosDistancia = req.body;

  fs.readFile(FILE_PATH_DIST, "utf8", (err, data) => {
    let carros = [];

    if (!err && data) {
      carros = JSON.parse(data);
    }
    carros.push(dadosDistancia);

    fs.writeFile(FILE_PATH_DIST, JSON.stringify(carros, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ erro: "Erro ao salvar carro" });
      }
    });

    res.status(201).send();
  });
});





//function callback - função que se executa, e espera um resultado ficar pornto para chamar outra função?

app.listen(PORT, () => {
  // temos que passar 2 informações. A 1ª é qual porta a api (app) está escutando. A 2ª é uma função callback, que será executada quando a api estiver ouvindo na porta correta, que definimos
  console.log(`Servidor rodando em http:localhost: ${PORT}`); //p verificar no terminal se está rodando correto -> acessar a pasta onde está o arquivo atual (api.js) e rodar "node ./api.js"
});
