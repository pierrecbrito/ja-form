import '../css/Table.css';
import '../css/Suite.css';
import $ from 'jquery'
import Produtos from '../data/Produtos';
import { useState, useEffect } from 'react';

function TableProdutos({atualizarTabela, setAtualizarTabela}) {
  const [produtos, setProdutos] = useState('Carregando...')

  const atualizar = () => {
    const produtosDB = new Produtos()
    produtosDB.listarProdutos().then((response) => {
        setProdutos(
          response.map((produto) =>   //Constrói uma linha de tabela para cada produto no banco
            <tr className='linha'>
              <td>{produto.descricao}</td>
              <td>R$ {produto.valorMontagem} </td>
              <td>R$ {produto.valorPV}</td>
            </tr>
        ))
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