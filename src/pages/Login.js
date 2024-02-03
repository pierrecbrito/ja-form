import logo from '../JA.png';
import '../css/Login.css';
import '../css/Suite.css';

function Login() {
  return (
    <div className="App">
      <main className="App-fundo-login">
            <form id="Formulario">
                <img src={logo} className="App-logo-form" alt="logo da JA" />
            </form>
      </main>
    </div>
  );
}

export default Login;
