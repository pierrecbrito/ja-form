import '../css/Dashboard.css';
import '../css/Suite.css';
import '../css/Controle.css'
import '../css/Relatorio.css'
import Button from '../components/Button';
import Connection from '../components/Connection';
import Hamburger from '../menu.svg'
import Menu from '../components/Menu';
import $ from 'jquery'
import Card from '../components/Card';
import TableProdutos from '../components/TableProdutos';
import KMPrice from '../components/KMPrice';
import Modal from 'react-modal';
import React from 'react';
import ModalCadastroDeProduto from '../components/ModalCadastroProduto';
import Produtos from '../data/Produtos';
import Configuracao from '../data/Configuracoes';
import Chart from 'react-apexcharts'
import ListaDocumentos from '../components/ListaDocumentos';
import Input from '../components/Input';
import ListaFiltroDocumento from '../components/ListaFiltroDocumento';
import ListaDeUsuarios from '../components/ListaDeUsuarios';
import TabelaDocumentos from '../components/TabelaDocumentos';

function Relatorio() {
  const configuracao = new Configuracao()

  const [modalCadastroIsOpen, setIsOpen] = React.useState(false);
  const [valorKM, setValorKM] = React.useState(0);
  const [atualizarTabela, setAtualizarTabela] = React.useState(false);
  const [series, setSeries] = React.useState([44, 55, 41, 17, 15])
  const [labels, setLabels] = React.useState(['Selenium', 'Selenium PRO', 'Titanium', 'Titanium Eletric', 'Selenium Eletric'])
  const [options, setOptions] = React.useState({labels: labels})
  const [totalGeral, setTotalGeral] = React.useState(0)
  const [comissaoTotal, setComissaoTotal] = React.useState(0)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const openMenu = () => {
    $('.menu').animate({right: 0})
  }
  
  if(valorKM == 0){
    configuracao.getValorDoKM().then((valor) => setValorKM(valor))
  }

  const filtros = () => {
    return (
      <div className='filtros'>
        <div className='filtro-intervalo'>
          <Input className="filtro" type='date' name="Início" value={new Date()}/>
          <Input type='date' name="Fim" value={new Date()} style={{'display': 'inline-block'}}/>
        </div>
        
        <ListaFiltroDocumento />
        <ListaDeUsuarios />
        <Button text="Filtar" style={{'margin-left': '10px'}}/>
      </div>
    )
  }
  

  return (
    <div className="App">
    <main className="App-fundo-dashboard">
        <header class="cabecalho">
          <Connection/>
          <img src={Hamburger} className="hamburger" alt="Botão de menu" onClick={openMenu} />
        </header>

        <Menu/>

        <h3 className="mensage">Relatório</h3>
        
        <div className="row">
            <Card titulo="Filtro" body={filtros()}/>
            <div style={{'text-align': 'right', 'marginTop': '10px'}}>
              <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total geral: R$ {totalGeral} </span>
              <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Comissão total: R$ {comissaoTotal} </span>
            </div>
            <TabelaDocumentos setTotalGeral={setTotalGeral} setComissaoTotal={setComissaoTotal}/>
           
        </div>
       

    </main>

  
  </div>

  );
}

export default Relatorio;