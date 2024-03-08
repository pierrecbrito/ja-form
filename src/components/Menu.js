import '../css/Menu.css';
import Close from '../x-square.svg'
import $ from 'jquery'
import LogoMenu from '../JA.png'
import { NavLink } from 'react-router-dom';
import Auth from '../data/Auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


function Menu({type, name}) {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({})
    
    const closeMenu = () => {
        $('.menu').animate({right: -$('.menu').width()-100})
    }

    const deslogar = () => {
        Auth.logout()
        window.location.reload()
    }

    useEffect(() => {
        Auth.getUserAuthenticated()
        .then((user) => {
            console.log(user)
            setUsuario(user.data)
        }).catch((error) => {
            console.log(error)
        })
    },[])

    return (
        <nav class="menu">
            <img src={Close} className="close-menu" onClick={closeMenu}/>

            <img src={LogoMenu} className="logo-menu" />

            <p className='nome-usuario' style={{'fontWeight': 800}}>{usuario.nome}</p>

            <NavLink className="item-menu"  to="../inicio/">
                Página Inicial
            </NavLink>

            <NavLink className="item-menu"  to="../formulario/">
                Formulário
            </NavLink>

            {usuario.papel == "master" || usuario.papel == "controle" ?  <NavLink className="item-menu"  to="../relatorio/">Relatório</NavLink> : <div></div>}
           

            {usuario.papel == "master"?   <NavLink className="item-menu"  to="../controle/" >Controle</NavLink> : <div></div>}

            <NavLink className="item-menu sair"  onClick={deslogar}>
                Sair
            </NavLink>
            
        </nav>
    );
}

export default Menu;