// models/Colaborador.js
const mongoose = require('mongoose');

const ColaboradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

module.exports = mongoose.model('Colaborador', ColaboradorSchema);
