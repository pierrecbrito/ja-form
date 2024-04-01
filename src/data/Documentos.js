import { Client, Databases, Query, ID } from "appwrite";
import Auth from './Auth'
import axios from "axios";
import { URL_API } from "./Api";

class Documentos {

    constructor() {
      
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



    static createCobranca(distancia, horas,valorKM, valorHora, total, comissaoCobranca, maquinaCobranca, quantLinhasCobranca,
        numeroMaquinaCobranca, maquinaNovaCobranca, faturadoRevendaCobranca, produtoCobranca, valorProdutoCobranca, servicosExecutadosCobranca, testeRealizadosCobranca) {
        return ({
            "distancia": parseFloat(distancia),
            "horas": parseFloat(horas),
            "valor_km": valorKM,
            "valor_hora": valorHora,
            "total": total,
            "maquina": maquinaCobranca,
            "numero_maquina": numeroMaquinaCobranca,
            "quantidade_linhas": quantLinhasCobranca,
            "maquina_nova": maquinaNovaCobranca, 
            "faturado_revenda": faturadoRevendaCobranca,
            "produto": produtoCobranca,//O valor do produto eu pego no back
            "valor_produto": valorProdutoCobranca,
            "servicos_executados": servicosExecutadosCobranca,
            "testes_realizados": testeRealizadosCobranca,
            "comissao": comissaoCobranca
        })
    }

    /* Xano Client: */
    static createCabecalho(nome, cnpj, cpf, endereco, cep, cidade, email, telefone, total, comissao) {
        return(
            {
                "nome": nome,
                "cnpj": cnpj,
                "cpf": cpf,
                "endereco": endereco,
                "cep": cep,
                "cidade": cidade,
                "telefone": telefone,
                "email": email,
                "total": total,
                "comissao": parseFloat(comissao)
            }
        )
    }

    /* Xano Client: */
    static createDocInstalacao(maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, dono, notaFiscal, valorProduto, total,  parceiros, comissaoInstalacao) {
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
                "parceiros": parceiros,
                "comissao": comissaoInstalacao
            }
        )
    }

    static createDocPosVenda(maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, valorProduto, total, comissaoPV) {
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
                "total": total,
                "comissao": comissaoPV
            }
        )
    }

    static salvarDocumento({nome, cnpj, cpf, endereco, cep, cidade, telefone, maquinaMontagem, quantLinhasMontagem, numeroMaquinaMontagem,
        maquinaNovaMontagem,faturadoRevendaMontagem,produto,servicosExecutadosMontagem,testeRealizadosMontagem,
        parceiros,notaFiscal,  maquinaPV, quantLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV,
        servicosExecutadosPV, testeRealizadosPV, distancia, horasTrabalhadas,  
        valorDoKM, valorDaHora, totalInstalacao, totalPV, totalDistancia, totalHorasTrabalhadas, totalDocumento,
        comissao, valorProdutoPV, valorProdutoMontagem, usuario, email,  comissaoInstalacao,comissaoPV, totalCobranca, comissaoCobranca, maquinaCobranca, quantLinhasCobranca,
        numeroMaquinaCobranca, maquinaNovaCobranca, faturadoRevendaCobranca, produtoCobranca, valorProdutoCobranca, servicosExecutadosCobranca, testeRealizadosCobranca}) {

        let cabecalho = this.createCabecalho(nome, cnpj, cpf, endereco, cep, cidade, email, telefone, totalDocumento, comissao, distancia, horasTrabalhadas, valorDoKM, valorDaHora, totalHorasTrabalhadas + totalDistancia)
        
        let documentosInstalacoes = []
  
        if(produto != '' && parseFloat(totalInstalacao) > 0) {
            for (var i = 0; i < parceiros.length; i++) {
                //maquina, quantLinhas, numeroMaquina, maquinaNova, faturadoRevenda, produto_id, servicosExecutados, testesRealizados, dono, notaFiscal, valorProduto, total, parceiros
                documentosInstalacoes.push(this.createDocInstalacao(maquinaMontagem, quantLinhasMontagem, numeroMaquinaMontagem,
                    maquinaNovaMontagem, faturadoRevendaMontagem, produto, servicosExecutadosMontagem, testeRealizadosMontagem, parceiros[i], 
                    notaFiscal, valorProdutoMontagem, totalInstalacao, parceiros, comissaoInstalacao))
            }
        }

        let pv = null
        if(produtoPV != '' && parseFloat(totalPV) > 0) {
           pv = this.createDocPosVenda(maquinaPV, quantLinhasPV, numeroMaquinaPV, maquinaNovaPV, faturadoRevendaPV, produtoPV, servicosExecutadosPV, testeRealizadosPV, valorProdutoPV, totalPV, comissaoPV)
        }

        let cobranca = null
        if(produtoCobranca != '' && parseFloat(totalCobranca) > 0) {
            cobranca = this.createCobranca(distancia, horasTrabalhadas, valorDoKM, valorDaHora, totalDistancia + totalHorasTrabalhadas, comissaoCobranca
                , maquinaCobranca, quantLinhasCobranca, numeroMaquinaCobranca, maquinaNovaCobranca, faturadoRevendaCobranca, produtoCobranca, valorProdutoCobranca, servicosExecutadosCobranca, testeRealizadosCobranca)
         }

        const documentoCompleto = {
                "documento": {
                    "cabecalho": cabecalho,
                    "documentos_instalacao": documentosInstalacoes,
                    "documento_pos_venda": pv,
                    "cobranca": cobranca
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

    static listarTodosDocumentos() {
        return axios.get(`${URL_API}/documents/`, 
            {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static toggleCabecalho(cabecalho_id) {
        return axios.post(`${URL_API}/documents/cabecalho/${cabecalho_id}/`, 
            {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
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