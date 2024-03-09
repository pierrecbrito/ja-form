import axios from "axios";

class Auth {
    /**
     * Vai gerenciar nosso acesso a autenticação da Xano
     */
    constructor() {}

    static async login(email, senha) {
        return axios.post('https://x8ki-letl-twmt.n7.xano.io/api:pBK6sn-v/auth/login', {
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
    
    static async getUserAuthenticated() {
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:pBK6sn-v/auth/me', {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        })
    }

    static async createUser(nome, email, senha) {
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

    static async getAllUsers() {
        return axios.get('https://x8ki-letl-twmt.n7.xano.io/api:pBK6sn-v/user', {
            headers: {
                'Authorization': `Bearer ${this.getToken()}`,
            }
        })
    }
    
}

export default Auth