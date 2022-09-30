import dbKnex from '../data/db_config.js'

export const fornecedorIndex = async(req, res) => {
    try {
        // obtém da tabela de fornecedores todos os registros (em ordem de nome)
        const fornecedores = await dbKnex.select("*").from("fornecedores").orderBy("nome")
        res.status(200).json(fornecedores)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const fornecedorStore = async(req, res) => {
    // atribui via desestruturação
    const { nome, email } = req.body

    if (!nome || !email) {
        res.status(400).json({ id: 0, msg: "Erro... informe nome e email do fornecedor" })
        return
    }


    try {
        const novo = await dbKnex('fornecedores')
            .insert({ nome, email })

        // novo[0] => retorna o id do registro inserido                     
        res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const produtoUpdate = async(req, res) => {
    //  const id = req.params.id;
    const { id } = req.params;

    // atribui via desestruturação
    const { tipo, marca, preco } = req.body

    if (!tipo || !marca || !preco) {
        res.status(400).json({
            id: 0,
            msg: "Erro... informe tipo, marca e preco do produto"
        })
        return
    }

    try {
        await dbKnex("produtos").where({ id })
            .update({ tipo, marca, preco })

        res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const produtoDelete = async(req, res) => {
    //  const id = req.params.id;
    const { id } = req.params;

    try {
        await dbKnex("produtos").where({ id }).del()
        res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const produtoPesq = async(req, res) => {

    const { marca } = req.params

    try {
        // obtém da tabela de produtos todos os registros da marca indicada
        const produtos = await dbKnex("produtos").whereLike('marca', marca)
        res.status(200).json(produtos)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const produtoTipo = async(req, res) => {

    const { tipo } = req.params

    try {
        // obtém da tabela de produtos todos os registros da tipo indicado
        const produtos = await dbKnex("produtos").whereLike('tipo', `%${tipo}%`)
        res.status(200).json(produtos)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}