import logo from '../JA.png';
import '../css/Login.css';
import '../css/Suite.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Auth from '../data/Auth';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const logar = () => {
     
      Auth.login(email, senha)
        .then(result => {
          console.log(result)
          let token = result.data.authToken
          localStorage.setItem('token', token)
          navigate("/inicio");//Em caso de sucesso
        }).catch( error => {
          console.log(error)
          notificarErroDeLogin(error.message)//Em caso de erro
        })
  }

  const notificarErroDeLogin = (erro) => {
    toast(erro, {
        duration: 5000,
        position: 'bottom-center',
      
        // Styling
        style: {
            boxShadow: '0 1rem 3rem rgba(0,0,0,.175) !important',
            fontSize: '14px'
        },
        className: '',
      
        // Custom Icon
        icon: '❌',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
    });
  } 
  
  return (
    <div className="App">
      <main className="App-fundo-login">
           

            <div id="Formulario">
                <img src={logo} className="App-logo-form" alt="logo da JA" />
                <Input type="text" name="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input type="password" name="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>

                <div class="container-button"><Button text="Entrar" onClick={logar}/></div>

                <div class="copyright-container">
                    <span>&copy; JA 2024</span>
                </div>
                <Toaster/>
            </div>
           
      </main>
    </div>
  );
}

export default Login;
