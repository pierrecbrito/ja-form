import logo from '../JA.png';
import '../css/Login.css';
import '../css/Suite.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const paginaInicial = () => {
      navigate("/inicio");
  }
  
  return (
    <div className="App">
      <main className="App-fundo-login">
           

            <form id="Formulario">
                <img src={logo} className="App-logo-form" alt="logo da JA" />
                <Input type="text" name="Login" />
                <Input type="password" name="Senha" />

                <div class="container-button"><Button text="Entrar" onClick={paginaInicial}/></div>

                <div class="copyright-container">
                    <span>&copy; JA 2024</span>
                </div>
            </form>
      </main>
    </div>
  );
}

export default Login;
