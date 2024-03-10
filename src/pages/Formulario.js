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
import ListaDeProduto from '../components/ListaDeProduto-xano';
import InputRadio from '../components/InputRadio';
import React from 'react';
import Button from '../components/Button'
import Documentos from '../data/Documentos';
import ListaDeParceiros from '../components/ListaDeParceiros';
import ValorSecao from '../components/ValorSecao';
import Configuracao from '../data/Configuracoes';
import Produtos from '../data/Produtos';
import toast, { Toaster } from 'react-hot-toast';
import Auth from '../data/Auth';

class Formulario extends React.Component {

    constructor(props) {
        super(props);

        this.openMenu = () => {
            $('.menu').animate({right: 0})
        }

        this.state = {
            nome: '',
            cnpj: '',
            cpf: '',
            endereco: '',
            cep: '',
            cidade: '',
            telefone: '',
            maquinaMontagem: '',
            quantLinhasMontagem: 0,
            numeroMaquinaMontagem: '',
            maquinaNovaMontagem: false,
            faturadoRevendaMontagem: '',
            produto: '',
            servicosExecutadosMontagem: '',
            testeRealizadosMontagem: '',
            parceiros: '',
            notaFiscal: '',
            maquinaPV: '',
            quantLinhasPV: 0,
            numeroMaquinaPV: '',
            maquinaNovaPV: false,
            faturadoRevendaPV: '',
            produtoPV: '',
            servicosExecutadosPV: '',
            testeRealizadosPV: '',
            distancia: 0,
            horasTrabalhadas: 0, 
            valorDoKM: 0,
            valorDaHora: 0,
            produtos: [],
            allParceiros: []
        }

        this.submit = () => {     
         
            const novoDocumento = {...this.state, 
                totalInstalacao: this.getValorTotalInstalacao(),
                totalPV: this.getValorTotalPV(),
                totalDistancia: this.getValorTotalDistancia(),
                totalHorasTrabalhadas: this.getValorTotalHorasTrabalhadas(),
                totalDocumento: this.getValorTotal(),
                comissao: this.state.parceiros.length > 0 ? (this.getComissao()/this.state.parceiros.length).toFixed(2) : this.getComissao().toFixed(2),
                valorProdutoPV: this.getValorPVDe(this.state.produtoPV),
                valorProdutoMontagem: this.getValorMontagemDe(this.state.produto),
                parceiros: this.state.parceiros.length > 0 ? this.state.parceiros.join(',') : 'Sem parceiros.',
            }

            console.log('Novo Documento', novoDocumento)

            Documentos.salvarDocumento(novoDocumento)
                .then((result) => {
                    console.log(result)
                    this.notificarDocumentoEnviado()
                })
           
        }

    }

    componentDidMount() {
        $(`#secao-instalacao`).slideUp(3)
        $(`#secao-pos-venda`).slideUp(3)
        $(`#secao-adicionais`).slideUp(3)

        let configuracaoDB = new Configuracao()
        configuracaoDB.getValorDoKM().then(valor => this.setState({valorDoKM: valor}))
        configuracaoDB.getValorDaHora().then(valor => this.setState({valorDaHora: valor}))
        Produtos.listarProdutos().then(produtos => this.setState({produtos: produtos.data})).catch((erro) => {
            this.notificarErro("Erro ao carregar produtos. Recarregue a página.")
        })

        Auth.getUserAuthenticated()//Lista parceiros
            .then(info => {
                let usuario = info.data
                Auth.getAllUsers().then((info) => {
                    let outrosParceiros = info.data.filter(usuarios => usuarios.email != usuario.email && usuarios.papel == 'colaborador')
                    this.setState({allParceiros: outrosParceiros})
                }).catch((erro) => {
                    this.notificarErro("Erro ao carregar parceiros. Recarregue a página.")
                })
            }).catch((erro) => {
                this.notificarErro("Erro ao carregar parceiros. Recarregue a página.")
            })
    }

    getValorMontagemDe(produtoDescricao) {
        if(this.state.produtos.length != 0 && produtoDescricao != ''){
            console.log(this.state.produtos, produtoDescricao)
            return this.state.produtos.filter(p => p.descricao == produtoDescricao)[0].valorMontagem
        } else
            return 0
    }

    getValorPVDe(produtoDescricao) {
        if(this.state.produtos.length != 0 && produtoDescricao != ''){
            console.log(this.state.produtos, produtoDescricao)
            return this.state.produtos.filter(p => p.descricao == produtoDescricao)[0].valorPV
        } else
            return 0
    }

    getValorTotalDistancia() {
        const distancia = this.state.distancia * this.state.valorDoKM
        return distancia
    }

    getValorTotalHorasTrabalhadas() {
        const horas = this.state.horasTrabalhadas * this.state.valorDaHora
        return horas
    }

    getValorTotalInstalacao() {
        const instalacao = this.getValorMontagemDe(this.state.produto) * this.state.quantLinhasMontagem
        return instalacao
    }

    getValorTotalPV() {
        const pv = this.getValorPVDe(this.state.produtoPV) * this.state.quantLinhasPV
        return pv
    }

    getValorTotal() {
        const instalacao = this.getValorMontagemDe(this.state.produto) * this.state.quantLinhasMontagem
        const pv = this.getValorPVDe(this.state.produtoPV) * this.state.quantLinhasPV
        const distancia = this.state.distancia * this.state.valorDoKM
        const horas = this.state.horasTrabalhadas * this.state.valorDaHora
        return instalacao + pv + distancia + horas
    }

    getComissao() {
        const horas = this.state.horasTrabalhadas * this.state.valorDaHora
        const distancia = this.state.distancia * this.state.valorDoKM
        return 0.10 * (horas + distancia)
    }

    notificarDocumentoEnviado(){
        toast('Documento enviado!', {
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

    notificarErro(erro){
        toast(erro, {
            duration: 5000,
            position: 'bottom-center',
          
            // Styling
            style: {
                boxShadow: '0 1rem 3rem rgba(0,0,0,.175) !important'
            },
            className: '',
          
            // Custom con
            icon: '❌',
          
            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
        });
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
                <Input type='text' name='Nome' value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                <InputComMascara name="CNPJ" mask="99.999.999/9999-99" value={this.state.cnpj} onChange={(e) => this.setState({cnpj: e.target.value})}/>
                <InputComMascara name="CPF" mask="999.999.999-99" value={this.state.cpf} onChange={(e) => this.setState({cpf: e.target.value})}/>
                <Input type='text' name='Endereço' value={this.state.endereco} onChange={(e) => this.setState({endereco: e.target.value})}/>
                <InputComMascara name="CEP" mask="99999-999" value={this.state.cep} onChange={(e) => this.setState({cep: e.target.value})}/>
                <Input type='text' name='Cidade' value={this.state.cidade} onChange={(e) => this.setState({cidade: e.target.value})}/>
                <InputComMascara name="Telefone" mask="(99) 99999-9999" value={this.state.telefone} onChange={(e) => this.setState({telefone: e.target.value})}/>

                <div style={{display: 'block', width: '100%'}}>
                    <SelectSection idSecao='secao-instalacao' nomeSecao='Instalação'/>
                    <SelectSection idSecao='secao-pos-venda' nomeSecao='Pós-Venda'/>
                    <SelectSection idSecao='secao-adicionais' nomeSecao='Informações adicionais'/>
                </div>

                <div id='secao-instalacao'>
                    <h3 style={{width: "100%"}}>Instalação</h3>
                    <Input type='text' name='Máquina' value={this.state.maquinaMontagem} onChange={(e) => this.setState({maquinaMontagem: e.target.value})}/>
                    <Input type='number' name='Quantidade de linha' value={this.state.quantLinhasMontagem} onChange={(e) => this.setState({quantLinhasMontagem: e.target.value})}/>
                    <Input type='number' name='Número de máquina' value={this.state.numeroMaquinaMontagem} onChange={(e) => this.setState({numeroMaquinaMontagem: e.target.value})}/>
                    <InputRadio name="É Máquina nova" id="maquina-nova" checked={this.state.maquinaNovaMontagem} onChange={(e) => this.setState({maquinaNovaMontagem: e.target.checked})}/>
                    <Input type='text' name='Faturado pela revenda' value={this.state.faturadoRevendaMontagem} onChange={(e) => this.setState({faturadoRevendaMontagem: e.target.value})}/>
                    <ListaDeProduto name="Produtos"  value={this.state.produto} onChange={(e) => this.setState({produto: e.value})} options={this.state.produtos.map(produto => {return {value: produto.nome, label: produto.nome}})}/>
                    <Input type='text' name='Serviços executados'  value={this.state.servicosExecutadosMontagem} onChange={(e) => this.setState({servicosExecutadosMontagem: e.target.value})}/>
                    <Input type='text' name='Testes realizados' value={this.state.testeRealizadosMontagem} onChange={(e) => this.setState({testeRealizadosMontagem: e.target.value})}/>
                    <ListaDeParceiros name="Parceiros" options={this.state.allParceiros.map(parceiro => {return {value: parceiro.nome, label: parceiro.nome}})} value={this.state.parceiros} onChange={(e) => { this.setState({parceiros: e.map(p => p.value)});}} isOptionDisabled={() => this.state.parceiros.length >= 2}/>
                    <Input type='text' name='Nota Fiscal' value={this.state.notaFiscal} onChange={(e) => this.setState({notaFiscal: e.target.value})}/>
                    <ValorSecao valor={this.getValorTotalInstalacao()}/>
                </div>

                <div id='secao-pos-venda'>
                    <h3 style={{width: "100%"}}>Pós-venda</h3>
                    <Input type='text' name='Máquina' value={this.state.maquinaPV} onChange={(e) => this.setState({maquinaPV: e.target.value})}/>
                    <Input type='number' name='Quantidade de linha' value={this.state.quantLinhasPV} onChange={(e) => this.setState({quantLinhasPV: e.target.value})}/>
                    <Input type='number' name='Número de máquina'  value={this.state.numeroMaquinaPV} onChange={(e) => this.setState({numeroMaquinaPV: e.target.value})}/>
                    <InputRadio name="É Máquina nova" id="maquina-nova" value="Máquina nova" checked={this.state.maquinaNovaPV} onChange={(e) => this.setState({maquinaNovaPV: e.target.checked})}/>
                    <Input type='text' name='Faturado pela revenda'  value={this.state.faturadoRevendaPV} onChange={(e) => this.setState({faturadoRevendaPV: e.target.value})}/>
                    <ListaDeProduto name="Produtos" value={this.state.produtoPV} onChange={(e) => this.setState({produtoPV: e.value})} options={this.state.produtos.map(produto => {return {value: produto.nome, label: produto.nome}})}/>
                    <Input type='text' name='Serviços executados' value={this.state.servicosExecutadosPV} onChange={(e) => this.setState({servicosExecutadosPV: e.target.value})}/>
                    <Input type='text' name='Testes realizados' value={this.state.testeRealizadosPV} onChange={(e) => this.setState({testeRealizadosPV: e.target.value})}/>
                    <ValorSecao valor={this.getValorTotalPV()}/>
                </div>

                <div id='secao-adicionais'>
                    <h3 style={{width: "100%"}}>Informações adicionais</h3>
                    <Input name="Distância percorrida (KM):" type="number" value={this.state.distancia} onChange={(e) => this.setState({distancia: e.target.value})}/>

                    <Input name="Horas implementadas:" type="number" value={this.state.horasTrabalhadas} onChange={(e) => this.setState({horasTrabalhadas: e.target.value})}/>
                    <ValorSecao valor={this.getValorTotalHorasTrabalhadas() + this.getValorTotalDistancia()}/>
                </div>


                <div id='secao-total'>
                    <span>Total do documento:  </span>
                    <ValorSecao valor={this.getValorTotal()}/>
                </div>
                <div id='secao-total'>
                    <span>Comissão:  </span>
                    <ValorSecao valor={this.getComissao()}/>
                </div>

                <Button text="Enviar" onClick={this.submit}/>

                <Toaster />
            </div>

        </main>
        </div>
        
      )
    }
  }


export default Formulario;