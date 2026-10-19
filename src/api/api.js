import express from "express"; // busca a pasta express que está dentro de 'node_modules'
import path from "path";
import cors from "cors";
import { Schema, Types } from "mongoose";
import { carsCollection } from "./db.js";
import Carro from "./carClass.js";

const app = express(); // dentro da variável app a gente tem todas as funcionalidades de 'express' --app geralmente é um nome dado à variavel api
const PORT = 3000;
const FILE_PATH = path.join(import.meta.dirname, "carros.json");

app.use(cors()); // Permite que o Live Server (porta 5500) acesse esta API

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/src/api/carros", async (req, res) => {
  console.log(req.query);

  const { nome, ano, marca } = req.query;

  const filter = { nome: { $regex: new RegExp(nome, "i") }, ano, marca };

  console.log(filter);

  if (!nome) {
    delete filter.nome; //se um deses campos vier vazio, a busca ignora o campo
  }
  if (!ano) {
    delete filter.ano;
  }
  if (!marca) {
    delete filter.marca;
  }

  const carros = await carsCollection.find(filter);

  console.log(carros);

  res.status(200).json(carros);
});

app.get("/src/api/carros/:id", async (req, res) => {
  const id = req.params.id;

  const carro = await carsCollection.findById(id);

  res.status(200).json(carro);
});

app.delete("/src/api/carros/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const carroDeletado = await carsCollection.findByIdAndDelete(req.params.id);
    console.log("Removido com sucesso!"); // Salva a lista nova no localStorage para o carro não voltar ao listar.
    res.send(200).json({ mensagem: "Removido com sucesso" });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

app.post("/src/api/carros", async (req, res) => {
  try {
    const novoCarro = new Carro(req.body);

    await carsCollection.insertOne(novoCarro);

    console.log("Carro cadastrado");

    res.status(201).send();
  } catch (e)
  {
    console.log(e)
    return res.status(400).json({error: e.message})
  }
});

app.post("/src/api/distancia", async (req, res) => {
  const dados = req.body; // req.body já é um onjeto js, não precisa usar JSON.parse

  const data = await carsCollection.findById(dados.carId);

  const carro = new Carro(data);

  // console.log(dados);

  // console.log("dados:", dados);

  //const data = await carsCollection.findById(dados.carId);

  // console.log("data:", data);

  const resultado = carro.calcularAutonomia(dados.litros);

  res.json( {resultado} );
});

app.patch("/src/api/carros/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log(req.body);

    const carroAtualizado = await carsCollection.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }, //retorna o documento atualizado
    );

    if (!carroAtualizado) {
      return res.status(404).send("Carro não encontrado");
    }

    res.status(200).json(carroAtualizado);
  } catch (error) {
    console.log(error);

    res.status(500).send("Erro interno do servidor");
  }
});

app.put("/src/api/carros/:id", async (req, res) => {
  const id = req.params._id;

  const carros = await carsCollection.find({});

  const existeCarro = carros.find((carro) => carro._id === id);
  if (!existeCarro) {
    return res.status(400).send("Carro não encontrado");
  }

  const novoCarro = req.body;

  carros = carros.map((carro) => {
    if (carro._id === id) {
      return {
        id,
        ...novoCarro,
      };
    }
    return carro;
  });
  res.send(carros);
});

//function callback - função que se executa, e espera um resultado ficar pornto para chamar outra função?

app.listen(PORT, () => {
  // temos que passar 2 informações. A 1ª é qual porta a api (app) está escutando. A 2ª é uma função callback, que será executada quando a api estiver ouvindo na porta correta, que definimos
  console.log(`Servidor rodando em http:localhost: ${PORT}`); //p verificar no terminal se está rodando correto -> acessar a pasta onde está o arquivo atual (api.js) e rodar "node ./api.js"
});
