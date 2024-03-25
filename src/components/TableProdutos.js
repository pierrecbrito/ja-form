import '../css/Table.css';
import '../css/Suite.css';
import $ from 'jquery'
import Produtos from '../data/Produtos';
import { useState, useEffect } from 'react';

function TableProdutos({atualizarTabela, setAtualizarTabela}) {
  const [produtos, setProdutos] = useState('Carregando...')

  const atualizar = () => {

    Produtos.listarProdutos()
    .then(result => { setProdutos(
      result.data.produtos.map((produto) =>  {
        return (
          <tr className='linha'>
            <td>{produto.name}</td>
            <td>R$ {produto.price_setup} </td>
            <td>R$ {produto.price_after_sales}</td>
          </tr>
        )
      }))
    }
    ).catch((erro) => {
      this.notificarErro(erro.response.data.detail)
    })
    
  }

  useEffect(() => {
    atualizar()
  }, []);


  return (
    <table className='tabela'>
      <thead className='tabela-cabecalho'>
        <tr>
          <th>Produto</th>
          <th>Valor normal</th>
          <th>Valor de PV</th>
        </tr>
      </thead>
      <tbody>
        {produtos}
      </tbody>
    </table>
  );
}

export default TableProdutos;