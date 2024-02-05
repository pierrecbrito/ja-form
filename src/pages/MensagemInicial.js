import '../css/Dashboard.css';
import '../css/Suite.css';
import Button from '../components/Button';
import $ from 'jquery'
import Dashboard from './Dashboard';
import Connection from '../components/Connection';
import Hamburger from '../menu.svg'
import Menu from '../components/Menu';

function MensagemInicial() {

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

            <h2 className="mensagem">Seja bem-vindo ao sistema da JA.</h2>
            <p className="sub-mensagem">Por aqui, você pode registrar documentos importantes para controle.</p>
            <Button text="Abrir menu" onClick={openMenu}/>

      </main>
    </div>
  );
}

export default MensagemInicial;