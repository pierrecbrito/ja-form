import axios from "axios";
import { URL_API } from "./Api";

class Auth {
    /**
     * Vai gerenciar nosso acesso a autenticação da Xano
     */
    constructor() {}

    static login(email, senha) {
        return axios.post(`${URL_API}/auth/signin/`, {
            'email': email,
            'password': senha
        })
    }

    static getToken() {
        return localStorage.getItem('token')
    }

    static logout() {
        localStorage.removeItem('token')
        return true
    }

    static isAuthenticated() {
        return localStorage.getItem('token') != undefined && localStorage.getItem('token') != null
    }
    
    static getUserAuthenticated() {
        return axios.get(`${URL_API}/auth/user/`, {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        })
    }

    static createUser(nome, email, senha) {
        return axios.post('https://x8ki-letl-twmt.n7.xano.io/api:pBK6sn-v/auth/signup',
            {
                "email": email,
                "password": senha,
                "nome": nome
            }
        , {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        })
    }

    static getAllUsers() {
        return axios.get(`${URL_API}/auth/users/`, {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        })
    }
    
}

export default Auth