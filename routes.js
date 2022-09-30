import { Router, json } from 'express'
import { produtoDelete, produtoIndex, produtoTipo, produtoPesq, produtoStore, produtoUpdate } from './controllers/EstoqueController.js'
import { fornecedorIndex, fornecedorStore } from './controllers/FornecedorController.js'
const router = Router()

// "converte" os dados recebidos para o formato json
router.use(json())

// define as rotas de cadastro de produtos
router.get('/produtos', produtoIndex)
    .post('/produtos', produtoStore)
    .put('/produtos/:id', produtoUpdate)
    .delete('/produtos/:id', produtoDelete)
    .get('/produtos/pesq/:marca', produtoPesq)
    .get('/produtos/tipo/:tipo', produtoTipo)

// define as rotas de cadastro de fornecedores
router.get('/fornecedores', fornecedorIndex)
    .post('/fornecedores', fornecedorStore)


export default router