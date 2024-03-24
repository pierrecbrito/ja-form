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
import React from 'react';
import Configuracao from '../data/Configuracoes';
import Input from '../components/Input';
import ListaFiltroDocumento from '../components/ListaFiltroDocumento';
import ListaDeUsuarios from '../components/ListaDeUsuarios';
import TabelaDocumentos from '../components/TabelaDocumentos';

function Relatorio() {
  const configuracao = new Configuracao()

  const [totalGeral, setTotalGeral] = React.useState(0)
  const [comissaoTotal, setComissaoTotal] = React.useState(0)
  const [filtro, setFiltro] = React.useState({tipo: 'Todos'})

  //Para filtrar
  const [usuario, setUsuario] = React.useState('Todos')
  const [tipoDocumento, setTipoDocumento] = React.useState('Todos')

  const openMenu = () => {
    $('.menu').animate({right: 0})
  }


  const filtros = () => {
    return (
      <div className='filtros'>
        <div className='filtro-intervalo'>
          <Input className="filtro" type='date' name="Início" value={new Date()}/>
          <Input type='date' name="Fim" value={new Date()} style={{'display': 'inline-block'}}/>
        </div>
        
        <ListaFiltroDocumento value={tipoDocumento} onChange={(e) => {setTipoDocumento(e.value)}}/>
        <ListaDeUsuarios value={usuario} onChange={(e) => { setUsuario(e.value)}}/>
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
              <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total geral: {totalGeral.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
              <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Comissão total: {comissaoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
            </div>
            <TabelaDocumentos setTotalGeral={setTotalGeral} setComissaoTotal={setComissaoTotal} usuario={usuario} tipoDocumento={tipoDocumento}/>
           
        </div>
       

    </main>

  
  </div>

  );
}

export default Relatorio;