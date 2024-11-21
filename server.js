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

// Configuração do CORS para permitir apenas o front-end
const corsOptions = {
  origin: ['https://scheduler-frontend-dun.vercel.app', 'http://localhost:3000'] // URL do front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permitir envio de cookies, se necessário
};
app.use(cors(corsOptions));

// Middleware para processar JSON no body das requisições
app.use(express.json());

// Log de requisições para depuração
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin); // Log da origem da requisição
  next();
});

// Configurar rotas
app.use('/api/clientes', clientesRoutes);
app.use('/api/colaboradores', colaboradoresRoutes);
app.use('/api/procedimentos', procedimentosRoutes);
app.use('/api/agendamentos', agendamentosRoutes);

// Rota para capturar erros 404 (não encontrada)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

// Exportar app para Vercel
module.exports = app;

// Iniciar o servidor localmente apenas se não estiver na Vercel
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
