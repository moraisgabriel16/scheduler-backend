const express = require('express');
const Cliente = require('../models/Cliente');
const router = express.Router();

// Criar um cliente
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, cpf } = req.body;

    // Validação básica
    if (!nome || !email || !telefone || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Criação do cliente
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
});

// Buscar clientes (com busca por nome ou CPF)
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    const query = search
      ? {
          $or: [
            { nome: new RegExp(search, 'i') }, // Busca por nome (case insensitive)
            { cpf: new RegExp(search, 'i') }, // Busca por CPF
          ],
        }
      : {}; // Sem filtro, retorna todos os clientes

    const clientes = await Cliente.find(query);
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
});

// Buscar detalhes de um cliente
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
});

// Atualizar um cliente
router.put('/:id', async (req, res) => {
  try {
    const { nome, email, telefone, cpf } = req.body;

    // Validação básica
    if (!nome || !email || !telefone || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna o documento atualizado
    });

    if (!clienteAtualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
});

// Excluir um cliente
router.delete('/:id', async (req, res) => {
  try {
    const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id);

    if (!clienteExcluido) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error: error.message });
  }
});

module.exports = router;
