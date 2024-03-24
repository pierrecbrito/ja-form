import axios from "axios";
import Auth from "./Auth";
import { URL_API } from "./Api";

class Produto {
    constructor(descricao, valorMontagem, valorPV) {//vALORpv = Valor Pós-venda
        this.descricao = descricao
        this.valorMontagem = valorMontagem
        this.valorPV = valorPV
    }

    toString() {
        return `Descrição: ${this.descricao} - Valor montagem: R$ ${this.valorMontagem} - Valor de Pós-venda: R$ ${this.valorPV}`
    }

}

class Produtos {
    constructor() {
 
    }


    static  listarProdutos() {//Do Xano
        return axios.get(`${URL_API}/products/`, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

    static async addProduto(nome, preco_instalacao, preco_pv) {//Do Xano
        return axios.post('https://x8ki-letl-twmt.n7.xano.io/api:sj42URrG/produto',{
            "nome": nome,
            "preco_instalacao": preco_instalacao,
            "preco_pv": preco_pv
          }, {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`,
            }
        })
    }

}

export default Produtos