import '../css/SelectSection.css';
import $ from 'jquery'
import {React, useState} from 'react';

   
function SelectSection({idSecao, nomeSecao}) {
 
    const ativado = {
        classe: 'ativado'
    }

    const nativado = {
        classe : 'nativado'
    }

    const [classe, setClasse] = useState(nativado.classe);

    const toggle = () => {
        if(classe == 'ativado') {
            $(`#${idSecao}`).slideUp()
            setClasse(nativado.classe)
           
        } else {
            $(`#${idSecao}`).slideDown()
            setClasse(ativado.classe)
        }
    }

    return (
        <button className={`btn-secao ${classe}`} onClick={toggle} id={`btn-${idSecao}`}>
            {nomeSecao}
        </button>
    );

}

export default SelectSection;