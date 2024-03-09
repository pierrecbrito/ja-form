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
import HoraPrice from '../components/horaPrice';
import Modal from 'react-modal';
import React from 'react';
import ModalCadastroDeProduto from '../components/ModalCadastroProduto';
import Produtos from '../data/Produtos';
import Configuracao from '../data/Configuracoes';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/meu-tabs.css'
import { useEffect } from 'react';
import TableUsers from '../components/TableUsers';
import toast, { Toaster } from 'react-hot-toast';
import ModalCadastroUsuario from '../components/ModalCadastroUsuario';

function Controle() {

  const [modalCadastroIsOpen, setIsOpen] = React.useState(false);
  const [modalCadastroUsuarioIsOpen, setCadastroDoUsuarioIsOpen] = React.useState(false);
  const [valorKM, setValorKM] = React.useState(0);
  const [valorHora, setValorHora] = React.useState(0);
  const [atualizarTabela, setAtualizarTabela] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openModalUsuario() {
    setCadastroDoUsuarioIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalUsuario() {
    setCadastroDoUsuarioIsOpen(false);
  }

  function atualizarValoresDeServicos() {
    Configuracao.updateValorDoKM(parseFloat(valorKM.replace("R$", "")))
    Configuracao.updateValorDaHora(parseFloat(valorHora.replace("R$", ""))).then((resultado) => {
      notificarValoresAtualizados()
    })
    
  }

  function notificarValoresAtualizados(){
    toast('Valores atualizados!', {
        duration: 5000,
        position: 'bottom-center',
      
        // Styling
        style: {
            boxShadow: '0 1rem 3rem rgba(0,0,0,.175) !important'
        },
        className: '',
      
        // Custom Icon
        icon: '✅',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
    });
  } 

  const openMenu = () => {
    $('.menu').animate({right: 0})
  }

  useEffect(() => {
    Configuracao.getValores() //Busca valores no banco
      .then((response) => {
        setValorKM(response.data.filter(e => e.id == 1)[0].valor)
        setValorHora(response.data.filter(e => e.id == 2)[0].valor)
      }).catch((error) => {
          console.log(error)
      })
  },[])
  

  return (
    <div className="App">
    <main className="App-fundo-dashboard">
        <header class="cabecalho">
          <Connection/>
          <img src={Hamburger} className="hamburger" alt="Botão de menu" onClick={openMenu} />
        </header>

        <Menu/>

        <h3 className="mensage">Controle</h3>

        <Tabs id='controle'>
          <TabList style={{textAlign: 'left'}}>
            <Tab>Produtos e valores</Tab>
            <Tab>Usuários</Tab>
          </TabList>

          <TabPanel>
            <div className='container-add-button'>
              <Button text="Adicionar produto" onClick={openModal}/>
            </div>

            <Card titulo="Produtos" body={<TableProdutos atualziarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela}/>}/>

            <div style={{display: 'flex', justifyContent:'center'}}>
              <KMPrice valor={valorKM} onChange={(e) => setValorKM(e.target.value)}/> 
              <HoraPrice valor={valorHora} onChange={(e) => setValorHora(e.target.value)}/><br></br>
            </div>

            <Button text='Atualizar' onClick={atualizarValoresDeServicos}/>
          </TabPanel>
          <TabPanel>
            <div className='container-add-button'>
              <Button text="Adicionar usuário colaborador" onClick={openModalUsuario}/>
            </div>
            <Card titulo="Usuários" body={<TableUsers atualziarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela}/>}/>
          </TabPanel>
        </Tabs>
    </main>
    <Toaster />
    <ModalCadastroDeProduto showModal={modalCadastroIsOpen} closeModalFunc={closeModal} setAtualizarTabela={setAtualizarTabela}/>
    <ModalCadastroUsuario showModal={modalCadastroUsuarioIsOpen} closeModalFunc={closeModalUsuario}/>
  </div>

  );
}

export default Controle;