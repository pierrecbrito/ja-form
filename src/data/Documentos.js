import { Client, Databases, Query, ID } from "appwrite";
import Auth from './Auth'
import axios from "axios";
import { URL_API } from "./Api";

class Documentos {

    constructor() {
      
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

    async listarDocumentosDeInstalacao() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d5f57b11be0abdb8ca" //ID da coleção de Produtos
        );

        let documentos = null
        await promise.then((response) => {
            console.log(response)
            documentos = response.documents
            console.log('documentios', documentos)
        })

        return documentos
    }

    async listarDocumentosDePV() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65d5f76187efe1c96706" //ID da coleção de Produtos
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



    static createDocInfo(distancia, horas,valorKM, valorHora, total) {
        return ({
            "distancia": parseFloat(distancia),
            "horas": parseFloat(horas),
            "valor_km": valorKM,
            "valor_hora": valorHora,
            "total": total
        })
    }

    /* Xano Client: */
    static createCabecalho(nome, cnpj, cpf, endereco, cep, cidade, telefone, total, comissao, distancia, horas, valorKM, valorHora, totalInfoAdicionais) {
        return(
            {
                "nome": nome,
                "cnpj": cnpj,
                "cpf": cpf,
                "endereco": endereco,
                "cep": cep,
                "cidade": cidade,
                "telefone": telefone,
                "total": total,
                "comissao": parseFloat(comissao),
                "informacoes_adicionais": this.createDocInfo(distancia, horas, valorKM, valorHora, totalInfoAdicionais)
            }
        )
    }

    /* Xano Client: */
    static createDocInstalacao(maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, dono, notaFiscal, valorProduto, total,  parceiros) {
        return (
            {
                "maquina": maquina,
                "quantidade_linhas": parseInt(quantLinhas),
                "numero_maquina": numeroMaquina,
                "maquina_nova": maquinaNova,
                "faturado_revenda": faturadoRevenda,
                "produto": produto_id,
                "servicos_executados": servicosExecutados,
                "testes_realizados": testesRealizados,
                "dono": dono,
                "nota_fiscal": notaFiscal,
                "valor_produto": valorProduto,
                "total": total,
                "parceiros": parceiros
            }
        )
    }

    static createDocPosVenda(maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, valorProduto, total) {
        return (
            {
                "maquina": maquina,
                "quantidade_linhas": parseInt(quantLinhas),
                "numero_maquina": numeroMaquina,
                "maquina_nova": maquinaNova,
                "faturado_revenda": faturadoRevenda,
                "produto": produto_id,
                "servicos_executados": servicosExecutados,
                "testes_realizados": testesRealizados,
                "valor_produto": valorProduto,
                "total": total
            }
        )
    }

    static salvarDocumento({nome, cnpj, cpf, endereco, cep, cidade, telefone, maquinaMontagem, quantLinhasMontagem, numeroMaquinaMontagem,
        maquinaNovaMontagem,faturadoRevendaMontagem,produto,servicosExecutadosMontagem,testeRealizadosMontagem,
        parceiros,notaFiscal,  maquinaPV, quantLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV,
        servicosExecutadosPV, testeRealizadosPV, distancia, horasTrabalhadas,  
        valorDoKM, valorDaHora, totalInstalacao, totalPV, totalDistancia, totalHorasTrabalhadas, totalDocumento,
        comissao, valorProdutoPV, valorProdutoMontagem, usuario}) {

        let cabecalho = this.createCabecalho(nome, cnpj, cpf, endereco, cep, cidade, telefone, totalDocumento, comissao, distancia, horasTrabalhadas, valorDoKM, valorDaHora, totalHorasTrabalhadas + totalDistancia)
        
        let documentosInstalacoes = []
  
        if(produto != '' && parseFloat(totalInstalacao) > 0) {
            for (var i = 0; i < parceiros.length; i++) {
                //maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, dono, notaFiscal, valorProduto, total, parceiros
                documentosInstalacoes.push(this.createDocInstalacao(maquinaMontagem, quantLinhasMontagem, numeroMaquinaMontagem,
                    maquinaNovaMontagem, faturadoRevendaMontagem, produto, servicosExecutadosMontagem, testeRealizadosMontagem, parceiros[i], 
                    notaFiscal, valorProdutoMontagem, totalInstalacao, parceiros))
            }
        }

        let pv = null
        if(produtoPV != '' && parseFloat(totalPV) > 0) {
           pv = this.createDocPosVenda(maquinaPV, quantLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV, servicosExecutadosPV, testeRealizadosPV, valorProdutoPV, totalPV)
        }

        const documentoCompleto = {
                "documento": {
                    "cabecalho": cabecalho,
                    "documentos_instalacao": documentosInstalacoes,
                    "documento_pos_venda": pv
                }
        }

        console.log("DOCUMENTO ENVIADO", documentoCompleto)
        
        return axios.post(`${URL_API}/documents/`, documentoCompleto ,
            {
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`,
                }
            }
        )
        
    }

    static async listInstalacoes() {
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:GeB5wpvs/instalacoes', 
            {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async listPosVendas() {
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:GeB5wpvs/posvendas', 
            {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }


}

export default Documentos