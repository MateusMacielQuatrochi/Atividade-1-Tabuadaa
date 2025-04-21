import express from 'express';

const host = '0.0.0.0';
const porta = 3000;
const app = express();

// Rota principal com formulário
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Gerador de Tabuada</title>
        </head>
        <body>
            <h1>Gerador de Tabuada</h1>
            <form action="/tabuada" method="get">
                <label for="tabuada">Número da tabuada:</label>
                <input type="number" id="tabuada" name="tabuada" required>
                <br><br>
                <label for="sequencia">Até qual número multiplicar? (opcional):</label>
                <input type="number" id="sequencia" name="sequencia" placeholder="11">
                <br><br>
                <button type="submit">Gerar</button>
            </form>
        </body>
        </html>
    `);
});

// Rota que gera a tabuada
app.get('/tabuada', (req, res) => {
    let tabuada = req.query.tabuada;
    let sequencia = parseInt(req.query.sequencia) || 11;

    if (!tabuada) {
        return res.status(400).send('Parâmetro "tabuada" é obrigatório.');
    }

    tabuada = parseInt(tabuada);

    res.write(`<!DOCTYPE html>`);
    res.write(`<html>`);
    res.write(`<head>`);
    res.write(`<meta charset="utf-8">`);
    res.write(`<title>Tabuada do ${tabuada}</title>`);
    res.write(`</head>`);
    res.write(`<body>`);
    res.write(`<h1>Tabuada do ${tabuada}</h1>`);
    res.write(`<ul>`);
    for (let i = 0; i < sequencia; i++) {
        const resultado = tabuada * i;
        res.write(`<li>${tabuada} x ${i} = ${resultado}</li>`);
    }
    res.write(`</ul>`);
    res.write(`<a href="/">Voltar</a>`);
    res.write(`</body>`);
    res.write(`</html>`);
    res.end();
});

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor está executando em http://${host}:${porta}`);
});
