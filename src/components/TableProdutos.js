import '../css/Table.css';
import '../css/Suite.css';
import $ from 'jquery'



function TableProdutos() {

  const openMenu = () => {
    $('.menu').animate({right: 0})
  }

  return (
    <table className='tabela'>
      <thead className='tabela-cabecalho'>
        <tr>
          <th>#</th>
          <th>Produto</th>
          <th>Valor normal</th>
          <th>Valor de PV</th>
        </tr>
      </thead>
      <tbody>
        <tr className='linha'>
          <td>1</td>
          <td>Montagem de infográfico</td>
          <td>R$ 250,00</td>
          <td>R$ 350,00</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableProdutos;