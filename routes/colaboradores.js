// routes/colaboradores.js
const express = require('express');
const Colaborador = require('../models/Colaborador');
const router = express.Router();

// Criar um colaborador
router.post('/', async (req, res) => {
  try {
    const novoColaborador = new Colaborador(req.body);
    const colaboradorSalvo = await novoColaborador.save();
    res.status(201).json(colaboradorSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar colaborador', error });
  }
});

// Buscar todos os colaboradores
router.get('/', async (req, res) => {
  try {
    const colaboradores = await Colaborador.find();
    res.status(200).json(colaboradores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar colaboradores', error });
  }
});

// Atualizar um colaborador
router.put('/:id', async (req, res) => {
  try {
    const colaboradorAtualizado = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!colaboradorAtualizado) {
      return res.status(404).json({ message: 'Colaborador não encontrado' });
    }
    res.status(200).json(colaboradorAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar colaborador', error });
  }
});

// Excluir um colaborador
router.delete('/:id', async (req, res) => {
  try {
    const colaboradorExcluido = await Colaborador.findByIdAndDelete(req.params.id);
    if (!colaboradorExcluido) {
      return res.status(404).json({ message: 'Colaborador não encontrado' });
    }
    res.status(200).json({ message: 'Colaborador excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir colaborador', error });
  }
});

module.exports = router;