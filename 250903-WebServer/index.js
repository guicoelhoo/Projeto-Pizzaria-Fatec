const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cardapio', (req, res) => {
  res.sendFile(path.join(__dirname, 'cardapio.html'));
});

app.get('/pedido', (req, res) => {
  const sabor = req.query.sabor || 'Nenhum';
  const borda = req.query.borda || 'Nenhuma';
  let adicionais = req.query.adicionais;
  const total = req.query.total || '0,00';

  let adicionaisHTML = '';
  if (!adicionais) {
    adicionaisHTML = '<li>Nenhum adicional selecionado</li>';
  } else if (Array.isArray(adicionais)) {
    adicionaisHTML = adicionais.map(a => `<li>${a}</li>`).join('');
  } else {
    adicionaisHTML = `<li>${adicionais}</li>`;
  }

  // Lê o template e insere os dados
  fs.readFile(path.join(__dirname, 'pedido.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('500 - Erro Interno do Servidor');
    } else {
      data = data.replace('{sabor}', sabor)
                 .replace('{borda}', borda)
                 .replace('{adicionais}', adicionaisHTML)
                 .replace('{total}', total);
      res.send(data);
    }
  });
});

module.exports = app;