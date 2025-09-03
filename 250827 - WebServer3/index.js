// Importação das Libs:
const express = require('express');
const fs = require('fs');
const path = require('path')

//Importação da configuração (variables.env)
require('dotenv').config({path:'variables.env'});

//Cria End-Point (rota):
const router = express();
 
//cria rota "/"
router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro interno do servidor");
        }else{
            res.status(200).type("text/html").send(data);
        }
    });
});

//Criar rota "/demo"
router.get('/rotademo',(req, res) =>{

    let nome = req.query.nome;
    let ano = req.query.ano;

    fs.readFile('./template/demo.html', 'utf8', (err, data) => {
        if(err){
            res.status(500).send("500 - Erro interno do servidor");
        }else{
            data = data.replace(`{nome}`, nome)
            data = data.replace(`{ano}`, ano)
            res.send(data);
        }
    });
});

//Criar a rota "/imc"
router.get('/imc', (req, res) => {
    //Entrada de variáveis - através da URL
    let nome = req.query.nome;
    let peso = parseFloat(req.query.peso);
    let altura = parseFloat(req.query.altura);

    //Processa informação - cálculco e class do IMC
    let imc = peso / (altura*altura);
    let classImc;

    if(imc < 18.5){
        classImc = "Abaixo do peso";
    }else if(imc < 24.9){
        classImc = "Peso normal";
    }else if(imc < 29.9){
        classImc = "Acima do peso";
    } else if(imc < 39.9){
        classImc="Misericórdia.."
    }

    //Apresentação do resultado via HTML
    fs.readFile('./template/imc.html', 'utf-8', (err, data) =>{
        if(err){
            res.status(500).send("500 - Erro interno do servidor");
        }else{
            data = data.replace(`{nome}`, nome);
            data = data.replace(`{imc}`, imc.toFixed(2));
            data = data.replace(`{peso}`, peso.toFixed(2));
            data = data.replace(`{altura}`, altura.toFixed(2));
            data = data.replace(`{classImc}`, classImc);
            res.send(data);
        }
    });
});

//Exportação
module.exports = router;