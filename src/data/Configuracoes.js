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

    static updateValorDoKM(novoValor) {
        return axios.put(`${URL_API}/config/2/`, {
            "value": novoValor,
        } , {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static updateValorDaHora(novoValor) {
        return axios.put(`${URL_API}/config/1/`, {
            "value": novoValor
        } , {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

}

export default Configuracao