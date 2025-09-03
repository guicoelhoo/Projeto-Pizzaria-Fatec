const app = require('./app');
require('dotenv').config({path: 'variable.env'});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
