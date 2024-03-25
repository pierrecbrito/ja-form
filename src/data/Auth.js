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
        return axios.post(`${URL_API}/auth/signup/`,
            {
                "email": email,
                "password": senha,
                "name": nome
            }
        )
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