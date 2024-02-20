import { Client, Databases, Query, ID } from "appwrite";

class Produto {
    constructor(descricao, valorMontagem, valorPV) {//vALORpv = Valor Pós-venda
        this.descricao = descricao
        this.valorMontagem = valorMontagem
        this.valorPV = valorPV
    }

    toString() {
        return `Descrição: ${this.descricao} - Valor montagem: R$ ${this.valorMontagem} - Valor de Pós-venda: R$ ${this.valorPV}`
    }

}

class Produtos {
    constructor() {
        const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject('65c4d9d1a09d06e65a7d');

        this.databases = new Databases(client);
    }

    async listarProdutos() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca0abd2602c400be81" //ID da coleção de Produtos
        );

        let produtos = null
        await promise.then((response) => {
            produtos = response.documents.map((documento) => new Produto(documento.descricao, documento.valorMontagem, documento.valorPV))
            console.log(response)
        })

        return produtos
    }

    async cadastrarProduto(descricao, valorMontagem, valorPV) {
        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca0abd2602c400be81", //ID da coleção de Produtos
            ID.unique(),
            {descricao, valorMontagem, valorPV}
        );

        
        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    async getValorMontagemDoProduto(produtoDescricao) {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca0abd2602c400be81", //ID da coleção de Produtos
            [Query.equal('descricao', produtoDescricao)]
        );

        let valor = 0
        await promise.then((response) => {
            if(response.documents[0] != undefined)
                valor = response.documents[0].valorMontagem
        })

        return valor
    }

    async getValorPVDoProduto(produtoDescricao) {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca0abd2602c400be81", //ID da coleção de Produtos
            [Query.equal('descricao', produtoDescricao)]
        );

        let valor = 0

        await promise.then((response) => {
            if(response.documents != undefined)
                valor = response.documents[0].valorPV
        })

        return valor
    }
}

export default Produtos