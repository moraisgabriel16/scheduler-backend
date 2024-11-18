// routes/procedimentos.js
const express = require('express');
const Procedimento = require('../models/Procedimento');
const router = express.Router();

// Criar um procedimento
router.post('/', async (req, res) => {
  try {
    const novoProcedimento = new Procedimento(req.body);
    const procedimentoSalvo = await novoProcedimento.save();
    res.status(201).json(procedimentoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar procedimento', error });
  }
});

// Buscar todos os procedimentos
router.get('/', async (req, res) => {
  try {
    const procedimentos = await Procedimento.find();
    res.status(200).json(procedimentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar procedimentos', error });
  }
});

// Atualizar um procedimento
router.put('/:id', async (req, res) => {
  try {
    const procedimentoAtualizado = await Procedimento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!procedimentoAtualizado) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.status(200).json(procedimentoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar procedimento', error });
  }
});

// Excluir um procedimento
router.delete('/:id', async (req, res) => {
  try {
    const procedimentoExcluido = await Procedimento.findByIdAndDelete(req.params.id);
    if (!procedimentoExcluido) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.status(200).json({ message: 'Procedimento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir procedimento', error });
  }
});

module.exports = router;