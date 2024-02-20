import { Client, Databases, Query, ID } from "appwrite";


class Documentos {
    constructor() {
        const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject('65c4d9d1a09d06e65a7d');

        this.databases = new Databases(client);
    }


    async salvarDocumento({nome, cnpj, cpf, endereco, cep, cidade, telefone, maquinaMontagem, quantLinhasMontagem, numeroMaquinaMontagem,
        maquinaNovaMontagem,faturadoRevendaMontagem,produto,servicosExecutadosMontagem,testeRealizadosMontagem,
        parceiros,notaFiscal,  maquinaPV, quantLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV,
        servicosExecutadosPV, testeRealizadosPV, distancia, horasTrabalhadas,  
        valorDoKM, valorDaHora, totalInstalacao, totalPV, totalDistancia, totalHorasTrabalhadas, totalDocumento,
        comissao, valorProdutoPV, valorProdutoMontagem}) {

        let quantidadeDeLinhas = parseInt(quantLinhasMontagem)    
        let quantidadeDeLinhasPV = parseInt(quantLinhasPV)    
        let distaciaEmInteiro = parseInt(distancia)
        let horasTrabalhasEmInteiro = parseInt(horasTrabalhadas)

        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca2260c6790927a758", //ID da coleção de Produtos
            ID.unique(),
            {nome, cnpj, cpf, endereco, cep, cidade, telefone, maquinaMontagem, quantLinhasMontagem: quantidadeDeLinhas, numeroMaquinaMontagem,
            maquinaNovaMontagem,faturadoRevendaMontagem,produto,servicosExecutadosMontagem,testeRealizadosMontagem,
            parceiros,notaFiscal, maquinaPV, quantLinhasPV: quantidadeDeLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV,
            servicosExecutadosPV, testeRealizadosPV, distancia: distaciaEmInteiro, horasTrabalhadas: horasTrabalhasEmInteiro,  valorDoKM, valorDaHora, 
            totalInstalacao, totalPV, totalDistancia, totalHorasTrabalhadas, totalDocumento, comissao, valorProdutoPV, valorProdutoMontagem}
        );

        
        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    async listarDocumentos() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca2260c6790927a758" //ID da coleção de Produtos
        );

        let documentos = null
        await promise.then((response) => {
            console.log(response)
            documentos = response.documents
            console.log('documentios', documentos)
        })

        return documentos
    }

}

export default Documentos