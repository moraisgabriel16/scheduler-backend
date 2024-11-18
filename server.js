// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const clientesRoutes = require('./routes/clientes');
const colaboradoresRoutes = require('./routes/colaboradores');
const procedimentosRoutes = require('./routes/procedimentos');
const agendamentosRoutes = require('./routes/agendamentos');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
connectDB();

// Inicializar o Express
const app = express();
app.use(cors());
app.use(express.json());

// Configurar rotas
app.use('/api/clientes', clientesRoutes);
app.use('/api/colaboradores', colaboradoresRoutes);
app.use('/api/procedimentos', procedimentosRoutes);
app.use('/api/agendamentos', agendamentosRoutes);

// Porta de escuta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
