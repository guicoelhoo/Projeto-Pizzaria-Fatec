// importação
const app = require('./app');

// importação da configuração (.env)
require('dotenv').config({path:'variaveis.env'}) 

// configuração do servidor
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'),() => {
    console.log("[OK] - Servidor em PORT: " + server.address().port);
})