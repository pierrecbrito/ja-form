import '../css/Input.css';
import '../css/Modal.css'
import ReactModal from 'react-modal';
import React from 'react';
import Input from './Input';
import InputDinheiro from './InputDinheiro';
import Button from './Button';
import Produtos from '../data/Produtos';
import toast from 'react-hot-toast';
import Auth from '../data/Auth';

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

class ModalCadastroUsuario extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            senha: ''
        }

        this.salvarUsuario= () => {
            //let valorMontagem = this.state.valorMontagem.toString().replace('R$', '')
      
            Auth.createUser(this.state.nome, this.state.email, this.state.senha)
                .then((resposta) => {
                    this.notificarUsuarioCadastrado(resposta.data.user.name)
                    this.props.closeModalFunc()
                })
        }
    }

    
    notificarUsuarioCadastrado(nomeUsuario){
        toast(`Usuário ${nomeUsuario} cadastrado com sucesso!`, {
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


    render () {
        return (
        <div>
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Minimal Modal Example"
                style={customStyles}

            >
                <header className='cabecalho_modal'>
                    Cadastrar usuário colaborador
                    <span className='btn-fechar-modal' onClick={this.props.closeModalFunc}>X</span>
                </header>
                <main className='body_modal'>
                    <Input name="Nome" type="text" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}/>
                    <Input name="E-mail" type="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    <Input name="Senha" type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}/>

                    <Button text="Salvar" onClick={this.salvarUsuario}/>
                </main>
        
            </ReactModal>
        </div>
        );
    }
}



export default ModalCadastroUsuario;