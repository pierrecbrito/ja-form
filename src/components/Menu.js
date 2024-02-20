import '../css/Menu.css';
import Close from '../x-square.svg'
import $ from 'jquery'
import LogoMenu from '../JA.png'
import { NavLink } from 'react-router-dom';

function Menu({type, name}) {

    const closeMenu = () => {
        $('.menu').animate({right: -$('.menu').width()-100})
    }

    return (
        <nav class="menu">
            <img src={Close} className="close-menu" onClick={closeMenu}/>

            <img src={LogoMenu} className="logo-menu" />

            <NavLink className="item-menu"  to="../inicio/">
                Página Inicial
            </NavLink>

            <NavLink className="item-menu"  to="../formulario/">
                Formulário
            </NavLink>

            <NavLink className="item-menu"  to="../relatorio/">
                Relatório
            </NavLink>

            <NavLink className="item-menu"  to="../controle/">
                Controle
            </NavLink>

            <NavLink className="item-menu sair"  to="../login/">
                Sair
            </NavLink>
            
        </nav>
    );
}

export default Menu;