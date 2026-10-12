import express from "express"; // busca a pasta express que está dentro de 'node_modules'
import path from "path";
import cors from "cors";
import { Schema, Types } from "mongoose";

import { carsCollection } from "./db.js";

const app = express(); // dentro da variável app a gente tem todas as funcionalidades de 'express' --app geralmente é um nome dado à variavel api
const PORT = 3000;
const FILE_PATH = path.join(import.meta.dirname, "carros.json");

app.use(cors()); // Permite que o Live Server (porta 5500) acesse esta API

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "public")));

/*app.get("/src/api/carros", (req, res) => {
  console.log(req.query);
  // req -> a rota que req vai receber - res -> a resposta que vai retornar res.send ou res.json para objetos em json

  const{nome, ano, marca} = req.query

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao ler arquivo" });
    }

    const carros = JSON.parse(data || "[]");

   /* const carrosFiltrados = carros.map((carro) => {
      if ( !ano || !nome || ano.includes(">") && carro.ano > ano.split(">")[1] && carro.nome == nome ) {
        return carro
      }
    }).filter(Boolean);*/

/*const carrosFiltrados = carros.map((carro) => {
      if ( !ano || !nome || !marca) {
        return carro
      }
    }).filter(Boolean);


    //console.log(carrosFiltrados)

    // console.log(carros);

    res.status(200).json(carrosFiltrados);
  });


}); */

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
  
const id = req.params.id


const carro =  await carsCollection.findById(id)

  

  res.status(200).json(carro);
});

/*app.delete("/src/api/carros/:id", async (req, res) => {
  //let carros = JSON.parse(fs.readFileSync(FILE_PATH));

  

  const { id } = req.params;

  const [nome, ano, marca] = id.split("_");
  console.log("aqui é o id", id);
  // console.log(carros)
  console.log("Aqui nome:", nome, "Aqui ano:", ano, "Aqui marca:", marca);

  try {
    const i = carros.findIndex(
      (carro) =>
        carro.nome === nome && carro.ano === ano && carro.marca === marca,
    );

    const filter = { nome: {$regex: new RegExp(nome, 'i')}, ano, marca };

  

    if (i !== -1) {
      carros.splice(i, 1);
      fs.writeFile(FILE_PATH, JSON.stringify(carros, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ erro: "Erro ao deletar carro" });
        }
      });
      

      console.log("Removido com sucesso!"); // Salva a lista nova no localStorage para o carro não voltar ao listar.
      res.send(200).json({ mensagem: "Removido com sucesso" });

      console.log("Removido com sucesso!");
      return;
    } else {
      console.log("Carro não encontrado");
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});*/

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

/*app.delete("/src/api/carros/:id", async (req, res) => {
  //let carros = JSON.parse(fs.readFileSync(FILE_PATH));

  

  const { id } = req.params;

  const [nome, ano, marca] = id.split("_");
  console.log("aqui é o id", id);
  // console.log(carros)
  console.log("Aqui nome:", nome, "Aqui ano:", ano, "Aqui marca:", marca);

  try {
    const i = carros.findIndex(
      (carro) =>
        carro.nome === nome && carro.ano === ano && carro.marca === marca,
    );

    if (i !== -1) {
      carros.splice(i, 1);
      fs.writeFile(FILE_PATH, JSON.stringify(carros, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ erro: "Erro ao salvar carro" });
        }
      });
      

      console.log("Removido com sucesso!"); // Salva a lista nova no localStorage para o carro não voltar ao listar.
      res.send(200).json({ mensagem: "Removido com sucesso" });

      console.log("Removido com sucesso!");
      return;
    } else {
      console.log("Carro não encontrado");
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});*/

/*const i = carros.findIndex(
      (carro) => carro.nome === nome && carro.ano === ano,
    );

    if (i !== -1) {
      carros.splice(i, 1);

      fs.writeFile(FILE_PATH, JSON.stringify(carros, null, 2));
      console.log("Removido com sucesso!");
    } else {
      console.log("Carro não encontrado");
    }
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

// Recebe o nome e o ano do carro que será apagado ao clicar em Deletar.
/*function removerCarro(nome, ano) {
  console.log(nome);

  // Busca novamente os carros salvos para alterar a lista correta.
  let dadosSalvos = await fetch("http://localhost:3000/src/api/carros").json;

  let data = JSON.parse(dadosSalvos);

  console.log(data);

  console.log(data.carros);
  console.log(data.carros[0]);

  // `const` indica que esta variável não receberá outra lista depois.
  //const data = data.carros;

  console.log(data);

  
  for (i = 0; i < data.length; i++) {                                                   // Procuramos o carro que tenha ao mesmo tempo o nome e o ano recebidos.
    if (data[i].nome == nome && data[i].ano == ano) {
      
      data.splice(i, 1);                                                                  // Tira o carro encontrado da data.

     
      window.localStorage.setItem("carrosCadastrados", JSON.stringify(data));           // Salva a lista nova no localStorage para o carro não voltar ao listar.

     
      document.getElementById(`${nome}_${ano}`).remove();                                // Remove a linha do carro que já estava aparecendo na tabela.
      
      break;                                                                              // `break` encerra o `for`, pq o carro já foi encontrado e removido.
    }
  }
}*/

app.post("/src/api/carros", async (req, res) => {
  const novoCarro = req.body;

  if (!novoCarro.nome) {
    console.log("O nome deve ser preenchido");
    return res.status(400).json({ erro: "O nome deve ser preenchido" });
  } else if (novoCarro.ano == null) {
    console.log("O ano deve ser preenchido");
    return res.status(400).json({ erro: "O ano deve ser preenchido" });
  } else if (!novoCarro.marca || novoCarro.marca.trim() === "") {
    console.log("A marca deve ser preenchida");
    return res.status(400).json({ erro: "A marca deve ser preenchida" });
  } else if (novoCarro.km_litro == null) {
    console.log("Quantos km por litro deve ser preenchido");
    return res
      .status(400)
      .json({ erro: "A kilometragem por litro deve ser preenchida" });
  }

  await carsCollection.insertOne(novoCarro);

  console.log("Carro cadastrado");

  res.status(201).send();
});

app.post("/src/api/distancia", async (req, res) => {
  const dados = req.body; // req.body já é um onjeto js, não precisa usar JSON.parse

  console.log(dados);

  console.log("dados:", dados);

  const data = await carsCollection.findById(dados.carId);

  console.log("data:", data);

  let fator;

  if (dados.velocidade <= 40) {
    fator = 0.8;
  } else if (dados.velocidade <= 60) {
    fator = 0.9;
  } else if (dados.velocidade <= 80) {
    fator = 1;
  } else if (dados.velocidade <= 100) {
    fator = 0.9;
  } else if (dados.velocidade <= 120) {
    fator = 0.8;
  } else if (dados.velocidade <= 140) {
    fator = 0.7;
  } else {
    fator = 0.6;
  }

  const consumo = data.km_litro * fator;

  //------------------Calculo distancia-----------------------
  const distancia = consumo * dados.litros;

  res.json({ distancia });
});

/*

app.patch("/src/api/carros/:id", async (req, res) => {
  const id = req.params.id;

  const carros = await carsCollection.find({});

  const i = carros.map((carro) => {
    if (!carro._id) {
      return res.status(404).send("Carro não encontrado");
    }

     const i = carros.findIndex ((carro) => carro._id === id);
      if(i === -1 ){
        return res.status(404).send("Carro não encontrado");
      }

      const carroAntigo = carros[i]

      const carroAtualizado = {
        ...carroAntigo,
        ...req.body,
      };
    
      carros[i] = carroAtualizado;

      res.status(200).send(carroAtualizado);
  
  });
})

*/



app.patch('/src/api/carros/:id', async (req, res) => {
  try {
    const id = req.params.id;

    console.log(req.body)

    const carroAtualizado = await carsCollection.findOneAndUpdate(
      { _id: new Types.ObjectId(id) }, 
      { $set: req.body },        
      { returnDocument: 'after' } //retorna o documento atualizado
    );

    if (!carroAtualizado) {
      return res.status(404).send('Carro não encontrado');
    }

 
    res.status(200).json(carroAtualizado);

  } catch (error) {
    console.log(error)
   
    res.status(500).send('Erro interno do servidor');
  }
});


  //const carroAntigo = await carsCollection.findById(carros.carId);

 



/*app.patch("/src/api/carros/:id", async (req, res) => {
  const id = req.params._id;

  const carros = await carsCollection.find({});

  const index = carros.findIndex ((carro) => carro._id === id);
  if(index === -1 ){
    return res.status(404).send("Carro não encontrado");
  }

  //const carroAntigo = await carsCollection.findById(carros.carId);

  const carroAntigo = carros[index]

  const carroAtualizado = {
    ...carroAntigo,
    ...req.body,
  };

  carros[index] = carroAntigo;

  res.status(200).send(carroAtualizado)
});
*/

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
