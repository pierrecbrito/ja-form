import '../css/Dashboard.css';
import '../css/Suite.css';
import '../css/Controle.css'
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

function Controle() {
  const configuracao = new Configuracao()

  const [modalCadastroIsOpen, setIsOpen] = React.useState(false);
  const [valorKM, setValorKM] = React.useState(0);
  const [atualizarTabela, setAtualizarTabela] = React.useState(false);

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
  

  return (
    <div className="App">
    <main className="App-fundo-dashboard">
        <header class="cabecalho">
          <Connection/>
          <img src={Hamburger} className="hamburger" alt="Botão de menu" onClick={openMenu} />
        </header>

        <Menu/>

        <h3 className="mensage">Controle</h3>
        
        <div className='container-add-button'>
          <Button text="Adicionar produto" onClick={openModal}/>
        </div>

        <Card titulo="Produtos" body={<TableProdutos atualziarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela}/>}/>

        <KMPrice valor={valorKM}/>

        <Button text='Atualizar'/>
    </main>

    <ModalCadastroDeProduto showModal={modalCadastroIsOpen} closeModalFunc={closeModal} setAtualizarTabela={setAtualizarTabela}/>
  </div>

  );
}

export default Controle;