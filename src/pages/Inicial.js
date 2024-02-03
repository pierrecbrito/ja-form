import logo from '../JA.png';
import '../css/Inicial.css';
import '../css/Suite.css'
import { redirect, useNavigate } from "react-router-dom";

function Inicial() {
  const navigate = useNavigate();

  const controller = () => {
    setTimeout(function() { //Após 3s, ele vai para a tela de login
      navigate("/login");
    }, 3000)
  }

  window.addEventListener('load', controller);

  return (
    <div className="App">
      <main className="App-fundo">
        <img src={logo} className="App-logo" alt="logo da JA" />
      </main>
    </div>
  );
}

export default Inicial;
