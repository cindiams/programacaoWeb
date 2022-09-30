import dbKnex from '../data/db_config.js'

export const produtoIndex = async(req, res) => {
    try {
        // obtém da tabela de produtos todos os registros
        const produtos = await dbKnex.select("*").from("produtos")
        res.status(200).json(produtos)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}

export const produtoStore = async(req, res) => {
    // atribui via desestruturação
    const { tipo, marca, preco } = req.body

    if (!tipo || !marca || !preco) {
        res.status(400).json({ id: 0, msg: "Erro... informe tipo, marca e preco do produto" })
        return
    }

    try {
        //produtos.push({tipo, marca, preco })
        const novo = await dbKnex('produtos')
            .insert({ tipo, marca, preco })

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
        // obtém da tabela de produtos todos os registros datipo indicado
        const produtos = await dbKnex("produtos").whereLike('tipo', `%${tipo}%`)
        res.status(200).json(produtos)
    } catch (error) {
        res.status(400).json({ id: 0, msg: "Erro: " + error.message })
    }
}