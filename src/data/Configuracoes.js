import Auth from "./Auth";
import axios from "axios";
import { URL_API } from "./Api";

class Configuracao {
    constructor() {
    }

    static async getValorHora() {
        return axios.get(`${URL_API}/config/1`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async getValorKM() {
        return axios.get(`${URL_API}/config/2`, {
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