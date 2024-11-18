const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  colaboradorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
  },
  procedimentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Procedimento',
    required: true,
  },
  dataHora: {
    type: Date,
    required: true,
  },
  duracao: {
    type: Number,
    required: true,
    min: 15,
  },
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
