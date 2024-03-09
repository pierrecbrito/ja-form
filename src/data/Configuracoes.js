import { Client, Databases, Query } from "appwrite";
import Auth from "./Auth";
import axios from "axios";

class Configuracao {
    constructor() {
        const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject('65c4d9d1a09d06e65a7d');

        this.databases = new Databases(client);
    }

    async getValorDoKM() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca19864a2e2ea152c1", //ID da coleção de Produtos
            [Query.equal('assunto', 'valorKM')]
        );

        let valor = 0
        await promise.then((response) => {
            valor = response.documents[0].valor
        })

        return valor
    }


    async getValorDaHora() {
        let promise = this.databases.listDocuments(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca19864a2e2ea152c1", //ID da coleção de Produtos
            [Query.equal('assunto', 'valorHora')]
        );

        let valor = 0
        await promise.then((response) => {
            valor = response.documents[0].valor
        })

        return valor
    }

    async setValorDoKM(novoValor) {
        let promise = this.databases.updateDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca19864a2e2ea152c1", //ID da coleção de Produtos
            "65ca1a0c69a575d35cd2",
            {valor: novoValor}
        );

        
        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    async setValorDaHora(novoValor) {
        let promise = this.databases.updateDocument(
            "65ca0aadd4fb66e02098", //ID do banco
            "65ca19864a2e2ea152c1", //ID da coleção de Produtos
            "65cbb55bb0484f46293d",
            {valor: novoValor}
        );

        
        let resposta = 0
        await promise.then((response) => {
            resposta = response
        })

        return resposta
    }

    static async getValorHora() {//Do Xano
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:_HqzMVdn/configuracao_geral/2', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async getValorKM() {//Do Xano
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:_HqzMVdn/configuracao_geral/1', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async getValores() {//Do Xano
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:_HqzMVdn/configuracao_geral', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async updateValorDoKM(novoValor) {
        return axios.patch('https://x8ki-letl-twmt.n7.xano.io/api:_HqzMVdn/configuracao_geral/1',{
            "configuracao_geral_id": 1,
            "nome": "valorKM",
            "valor": novoValor
        } , {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async updateValorDaHora(novoValor) {
        return axios.patch('https://x8ki-letl-twmt.n7.xano.io/api:_HqzMVdn/configuracao_geral/2',{
            "configuracao_geral_id": 2,
            "nome": "valorHora",
            "valor": novoValor
        } , {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async updateValoresDeServico(novoValorKM, novoValorHora) {
        console.log('valores', novoValorHora, novoValorKM)
        return Promise.all(Configuracao.updateValorDoKM(parseFloat(novoValorKM.replace('R$', ''))), Configuracao.updateValorDaHora(parseFloat(novoValorHora.replace('R$', ''))))
    }


}

export default Configuracao