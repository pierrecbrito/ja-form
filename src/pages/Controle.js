import '../css/Dashboard.css';
import '../css/Suite.css';
import Button from '../components/Button';
import Connection from '../components/Connection';
import Hamburger from '../menu.svg'
import Menu from '../components/Menu';
import $ from 'jquery'
import Card from '../components/Card';
import TableProdutos from '../components/TableProdutos';
import KMPrice from '../components/KMPrice';


function Controle() {

  const openMenu = () => {
    $('.menu').animate({right: 0})
  }

  return (
    <div className="App">
    <main className="App-fundo-dashboard">
        <header class="cabecalho">
          <Connection/>
          <img src={Hamburger} className="hamburger" alt="Botão de menu" onClick={openMenu} />
        </header>

        <Menu/>

        <h3 className="mensage">Controle</h3>

        <Card titulo="Produtos" body={<TableProdutos/>}/>

        <KMPrice/>

        <Button text='Atualizar'/>
    </main>
  </div>

  );
}

export default Controle;