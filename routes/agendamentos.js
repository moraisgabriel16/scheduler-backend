const express = require('express');
const Agendamento = require('../models/Agendamento');
const Cliente = require('../models/Cliente');
const Colaborador = require('../models/Colaborador');
const Procedimento = require('../models/Procedimento');
const router = express.Router();

// Criar um agendamento
router.post('/', async (req, res) => {
  const { clienteId, colaboradorId, procedimentoId, dataHora, duracao } = req.body;

  // Validação de campos obrigatórios
  if (!clienteId || !colaboradorId || !procedimentoId || !dataHora || !duracao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Validar cliente
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });

    // Validar colaborador
    const colaborador = await Colaborador.findById(colaboradorId);
    if (!colaborador) return res.status(404).json({ message: 'Colaborador não encontrado.' });

    // Validar procedimento
    const procedimento = await Procedimento.findById(procedimentoId);
    if (!procedimento) return res.status(404).json({ message: 'Procedimento não encontrado.' });

    // Criar agendamento
    const novoAgendamento = new Agendamento({
      clienteId,
      colaboradorId,
      procedimentoId,
      dataHora,
      duracao,
    });

    // Salvar no banco de dados
    const agendamentoSalvo = await novoAgendamento.save();
    res.status(201).json({
      message: 'Agendamento criado com sucesso.',
      agendamento: agendamentoSalvo,
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ message: 'Erro ao criar agendamento.', error: error.message });
  }
});

// Buscar todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const agendamentos = await Agendamento.find()
      .populate('clienteId', 'nome cpf')
      .populate('colaboradorId', 'nome')
      .populate('procedimentoId', 'nome');

    if (!agendamentos || agendamentos.length === 0) {
      return res.status(404).json({ message: 'Nenhum agendamento encontrado.' });
    }

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
});

// Buscar agendamento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const agendamento = await Agendamento.findById(id)
      .populate('clienteId', 'nome cpf')
      .populate('colaboradorId', 'nome')
      .populate('procedimentoId', 'nome');

    if (!agendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamento.', error: error.message });
  }
});

// Atualizar agendamento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { clienteId, colaboradorId, procedimentoId, dataHora, duracao } = req.body;

  if (!clienteId || !colaboradorId || !procedimentoId || !dataHora || !duracao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Validar cliente
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });

    // Validar colaborador
    const colaborador = await Colaborador.findById(colaboradorId);
    if (!colaborador) return res.status(404).json({ message: 'Colaborador não encontrado.' });

    // Validar procedimento
    const procedimento = await Procedimento.findById(procedimentoId);
    if (!procedimento) return res.status(404).json({ message: 'Procedimento não encontrado.' });

    // Atualizar agendamento
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      id,
      { clienteId, colaboradorId, procedimentoId, dataHora, duracao },
      { new: true }
    );

    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: 'Agendamento não encontrado para atualização.' });
    }

    res.status(200).json({
      message: 'Agendamento atualizado com sucesso.',
      agendamento: agendamentoAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ message: 'Erro ao atualizar agendamento.', error: error.message });
  }
});

// Deletar agendamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(id);

    if (!agendamentoDeletado) {
      return res.status(404).json({ message: 'Agendamento não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Agendamento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    res.status(500).json({ message: 'Erro ao excluir agendamento.', error: error.message });
  }
});

module.exports = router;
