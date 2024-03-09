import '../css/Table.css';
import '../css/Suite.css';
import $ from 'jquery'
import Produtos from '../data/Produtos';
import { useState, useEffect } from 'react';

function TableProdutos({atualizarTabela, setAtualizarTabela}) {
  const [produtos, setProdutos] = useState('Carregando...')

  const atualizar = () => {
    
    Produtos.listarProdutos().then((response) => {
        setProdutos(
          response.data.map((produto) =>   //Constrói uma linha de tabela para cada produto no banco
            <tr className='linha'>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco_instalacao} </td>
              <td>R$ {produto.preco_pv}</td>
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