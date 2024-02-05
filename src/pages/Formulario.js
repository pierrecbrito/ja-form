import '../css/Dashboard.css'
import '../css/Inicial.css';
import '../css/Suite.css';
import '../css/Formulario.css';
import Connection from '../components/Connection';
import Hamburger from '../menu.svg'
import Menu from '../components/Menu';
import $ from 'jquery'
import Input from '../components/Input';
import InputComMascara from '../components/InputComMascara';
import SelectSection from '../components/SelectSection';
import ListaDeProduto from '../components/ListaDeProduto';
import InputRadio from '../components/InputRadio';
import React from 'react';


class Formulario extends React.Component {

    constructor(props) {
        super(props);
       
    }

    openMenu = () => {
        $('.menu').animate({right: 0})
    }

    componentDidMount() {
        $(`#secao-executado`).hide()
        $(`#secao-pos-venda`).hide()
        $(`#secao-kms`).hide()
    }

    render() {
      return (
        <div className="App">
        <main className="App-fundo-dashboard">
                <header class="cabecalho">
                <Connection/>
                <img src={Hamburger} className="hamburger" alt="Botão de menu" onClick={this.openMenu} />
            </header>

            <Menu/>

            <h3 className="mensage">Formulário</h3>
            <div className='formulario-documento'>
                <Input type='text' name='Nome'/>
                <InputComMascara name="CNPJ" mask="99.999.999/9999-99"/>
                <InputComMascara name="CPF" mask="999.999.999-99"/>
                <Input type='text' name='Endereço'/>
                <InputComMascara name="CEP" mask="99999-999"/>
                <Input type='text' name='Cidade'/>
                <InputComMascara name="Telefone" mask="(99) 99999-9999"/>

                <div style={{display: 'block', width: '100%'}}>
                    <SelectSection idSecao='secao-executado' nomeSecao='Executado'/>
                    <SelectSection idSecao='secao-pos-venda' nomeSecao='Pós-Venda'/>
                    <SelectSection idSecao='secao-kms' nomeSecao='Distância'/>
                </div>

                <div id='secao-executado'>
                    <h3 style={{width: "100%"}}>Executado</h3>
                    <Input type='text' name='Máquina'/>
                    <Input type='number' name='Quantidade de linha'/>
                    <Input type='number' name='Número de máquina'/>
                    <InputRadio name="É Máquina nova" id="maquina-nova" value="Máquina nova"/>
                    <Input type='text' name='Faturado pela revenda'/>
                    <ListaDeProduto name="Produtos"/>
                    <Input type='text' name='Serviços executados'/>
                    <Input type='text' name='Testes realizados'/>
                </div>

                <div id='secao-pos-venda'>
                    <h3 style={{width: "100%"}}>Pós-venda</h3>
                    <Input type='text' name='Máquina'/>
                    <Input type='number' name='Quantidade de linha'/>
                    <Input type='number' name='Número de máquina'/>
                    <InputRadio name="É Máquina nova" id="maquina-nova" value="Máquina nova"/>
                    <Input type='text' name='Faturado pela revenda'/>
                    <ListaDeProduto name="Produtos"/>
                    <Input type='text' name='Serviços executados'/>
                    <Input type='text' name='Testes realizados'/>
                </div>

                <div id='secao-kms'>
                    <h3 style={{width: "100%"}}>Kilometros percorridos</h3>
                    <Input name="DistÂncia percorrida (KM):" type="number"/>
                </div>
            </div>

        </main>
        </div>
      )
    }
  }


export default Formulario;