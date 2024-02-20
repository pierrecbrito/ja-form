import '../css/Input.css';
import '../css/Modal.css'
import ReactModal from 'react-modal';
import React from 'react';
import Input from './Input';
import InputDinheiro from './InputDinheiro';
import Button from './Button';
import Produtos from '../data/Produtos';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

ReactModal.setAppElement('#root');
class ModalCadastroDeProduto extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            descricao: '',
            valorMontagem: 0,
            valorPV: 0
        }

        const produtosDB = new Produtos()
        this.salvarProduto = () => {
            //let valorMontagem = this.state.valorMontagem.toString().replace('R$', '')
            console.log(this.state)
            produtosDB.cadastrarProduto(this.state.descricao, this.state.valorMontagem, this.state.valorPV)
                .then((resposta) => {
                    console.log(resposta)
                    this.props.closeModalFunc()
                    this.props.setAtualizarTabela(true)
                })
        }
    }

    render () {
        return (
        <div>
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Minimal Modal Example"
                style={customStyles}

            >
                <header className='cabecalho_modal'>
                    Cadastrar produto
                    <span className='btn-fechar-modal' onClick={this.props.closeModalFunc}>X</span>
                </header>
                <main className='body_modal'>
                    <Input name="Descrição" type="text" value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})}/>
                    <InputDinheiro name="Valor de Montagem" value={this.state.valorMontagem} onChange={(e, value, maskedValue) => this.setState({valorMontagem: value})}/>
                    <InputDinheiro name="Valor pós-venda" value={this.state.valorPV} onChange={(e, value, maskedValue) => this.setState({valorPV: value})}/>
                    <Button text="Salvar" onClick={this.salvarProduto}/>
                </main>
        
            </ReactModal>
        </div>
        );
    }
}



export default ModalCadastroDeProduto;