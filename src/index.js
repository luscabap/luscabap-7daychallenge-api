const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = 3000;

const Planta = mongoose.model('planta', {
    nome_popular: String,
    nome_cientifico: String,
    descricao: String,
    preco: Number,
    imagem: String,
    id: Number
});

app.get('/', async (req, res) => {
    const plantas = await Planta.find();
    return res.send(plantas);
});

app.delete("/:id", async (req, res) => {
    const plantaASerDeletada = await Planta.findByIdAndDelete(req.params.id);
    return res.send(plantaASerDeletada)
});

app.post("/", async (req, res) => {
    const planta = new Planta({
        nome_popular: req.body.nome_popular,
        nome_cientifico: req.body.nome_cientifico,
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.body.imagem,
        id: req.body.id
    })

    await planta.save();
    return res.send(planta);
});

app.put("/:id", async (req, res) => {
    const planta = await Planta.findByIdAndUpdate(req.params.id, {
        nome_popular: req.body.nome_popular,
        nome_cientifico: req.body.nome_cientifico,
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.body.imagem,
        id: req.body.id 
    }, {
        new: true
    });

    return res.send(planta);
})

app.listen(port, () => {
    console.log("Escutando a porta " + port);
    mongoose.connect("mongodb+srv://lucasbaptistasilvadev:Vot3P7dMATdETNOU@plantas-api.skkkhcg.mongodb.net/?retryWrites=true&w=majority&appName=plantas-api");
})