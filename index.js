import express from 'express';

const host = `0.0.0.0`;
const porta = 3000;
const app = express();

function tabuada(requisicao, resposta){
    let tabuada = requisicao.query.tabuada;
    let sequencia = parseInt(requisicao.query.sequencia) || 11;
    if(!tabuada){
        requisicao.status(400).send('Parâmetro tabuada" é obrigatório');
    }
    resposta.write(`<!DOCTYPE html>`);
    resposta.write(`<html>`);
    resposta.write(`<head>`);
    resposta.write(`<meta charset="utf-8">`);
    resposta.write(`<title>Tabuada do ` + tabuada + `</title>`);
    resposta.write(`</head>`);
    resposta.write(`<body>`);
    resposta.write(`<h1>Tabuada do ` + tabuada + `</h1>`);
    resposta.write(`<ul>`);
    for (let i = 0; i < sequencia; i++) {
        const resultado = tabuada * i;
        resposta.write('<li>' + tabuada + ' x ' + i + ' = ' + resultado + '</li>');
      }
    resposta.write(`</ul>`);
    resposta.write(`</body>`);
    resposta.write(`</html>`);
    resposta.end();
}

app.get("/tabuada", tabuada);
app.listen(porta, host, () => {
 console.log("Servidor esta executando em http://" + host + ":" + porta);
});