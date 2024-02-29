import { Client, Databases, Query, ID } from "appwrite";


class Documentos {
    constructor() {
        this.client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject('65c4d9d1a09d06e65a7d');

        this.databases = new Databases(this.client);
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

        
        const todoDocumento = {nome, cnpj, cpf, endereco, cep, cidade, telefone, maquinaMontagem, quantLinhasMontagem: quantidadeDeLinhas, numeroMaquinaMontagem,
            maquinaNovaMontagem,faturadoRevendaMontagem,produto,servicosExecutadosMontagem,testeRealizadosMontagem,
            parceiros,notaFiscal, maquinaPV, quantLinhasPV: quantidadeDeLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV,
            servicosExecutadosPV, testeRealizadosPV, distancia: distaciaEmInteiro, horasTrabalhadas: horasTrabalhasEmInteiro,  valorDoKM, valorDaHora, 
            totalInstalacao, totalPV, totalDistancia, totalHorasTrabalhadas, totalDocumento, comissao, valorProdutoPV, valorProdutoMontagem}
        
        let cabecalho = await this.salvarCabecalho(todoDocumento)
    
        console.log("Cabeçalho", cabecalho)

        if(produto != '' && parseFloat(totalInstalacao) > 0) {
            let donos = parceiros.split(",")
            for (var i = 0; i < donos.length; i++) {
                await this.salvarDocumentoDeInstalacao({maquina: maquinaMontagem, quantLinhas: quantLinhasMontagem, numeroMaquina: numeroMaquinaMontagem,
                    maquinaNova: maquinaNovaMontagem, faturadoRevenda: faturadoRevendaMontagem, produto, servicosExecutados: servicosExecutadosMontagem, testesRealizados: testeRealizadosMontagem, parceiros, notaFiscal, valorProduto: valorProdutoMontagem, total: totalInstalacao, cabecalho: cabecalho.$id, dono: donos[i]}).then(resultado => console.log("Inst",resultado))
            }

            await this.salvarDocumentoDeInstalacao({maquina: maquinaMontagem, quantLinhas: quantLinhasMontagem, numeroMaquina: numeroMaquinaMontagem,
                maquinaNova: maquinaNovaMontagem, faturadoRevenda: faturadoRevendaMontagem, produto, servicosExecutados: servicosExecutadosMontagem, testesRealizados: testeRealizadosMontagem, parceiros, notaFiscal, valorProduto: valorProdutoMontagem, total: totalInstalacao, cabecalho: cabecalho.$id, dono: 'Pierre'}).then(resultado => console.log("Inst",resultado))
           
        }

        if(produtoPV != '' && parseFloat(totalPV) > 0) {
            let docPV = await this.salvarDocumentoPV({maquina: maquinaPV, quantLinhas: quantLinhasPV, numeroMaquina: numeroMaquinaPV,
                maquinaNova: maquinaNovaPV, faturadoRevenda: faturadoRevendaPV, produto: produtoPV, servicosExecutados: servicosExecutadosPV, testesRealizados: testeRealizadosPV, valorProduto: valorProdutoPV, total: totalPV, cabecalho: cabecalho.$id  }).then(resultado => console.log("PV",resultado))
        }

        console.log("Horas trabalhadas", totalHorasTrabalhadas)
        let docInfo = await this.salvarDocumentoInfo({distancia, horas: horasTrabalhasEmInteiro, valorHora: valorDaHora, valorKM: valorDoKM, totalDistancia: totalDistancia, cabecalho: cabecalho.$id, totalHorasTrabalhadas}).then(resultado => console.log("Info", resultado))
        
        return true
    }

    async salvarCabecalho({nome, cnpj, cpf, endereco, cep, cidade, telefone,  totalDocumento,
        comissao}) {

        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d63e7d0ce99723bdc2", //ID da coleção de Produtos
            ID.unique(),
            {nome, cnpj, cpf, endereco, cep, cidade, telefone, total: totalDocumento, comissao}
        );

        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    async salvarDocumentoDeInstalacao({maquina, quantLinhas, numeroMaquina,
        maquinaNova,faturadoRevenda, produto,servicosExecutados,testesRealizados,
        parceiros,notaFiscal,  valorProduto, total, cabecalho, dono}) {

        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d5f57b11be0abdb8ca", //ID da coleção de Produtos
            ID.unique(),
            {maquina, quantLinhas, numeroMaquina, maquinaNova,faturadoRevenda, produto,servicosExecutados,testesRealizados,
                parceiros,notaFiscal,  valorProduto, total, cabecalho, dono}
        );

        let resposta = await promise

        return resposta
    }

    async salvarDocumentoPV({ maquina, quantLinhas, numeroMaquina,
        maquinaNova,faturadoRevenda, produto,servicosExecutados,testesRealizados,
        valorProduto, total, cabecalho}) {

    

        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d5f76187efe1c96706", //ID da coleção de Produtos
            ID.unique(),
            {maquina, quantLinhas, numeroMaquina, maquinaNova,faturadoRevenda, produto,servicosExecutados,testesRealizados,
                  valorProduto, total, cabecalho}
        );

        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    
    async salvarDocumentoInfo({distancia, horas,  
        valorKM, valorHora, totalDistancia, totalHorasTrabalhadas, cabecalho}) {

     

        let promise = this.databases.createDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d5ff8f1d73a80470ce", //ID da coleção de Produtos
            ID.unique(),
            {distancia, horas, valorKM, valorHora, totalDistancia, totalHorasTrabalhadas, cabecalho}
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

    makeid(length=12) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

}

export default Documentos