import mongoose, { Schema } from "mongoose";


const db = mongoose.createConnection(
  "mongodb+srv://admin:eiTbiq4kdyPXoNQc@car-development.6o3htxm.mongodb.net/vesla",
);

db.on("connected", () => {
  console.log("O banco está rodando");
});

db.on("error", () => {
  console.log("O banco falhou");
});

db.on("close", () => {
  console.log("O banco encerrou");
});

const carsSchema = new Schema(
  {
    nome: {
        type: String, required: true
    },
    ano:  {
        type: Number, required: true
    },
    marca:  {
        type: String, required: true
    },
    km_litro: Number,
    img: String,
  },
  { timestamps: true },
);

export const carsCollection = db.model("cars", carsSchema);

