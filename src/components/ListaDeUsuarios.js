import { useState } from 'react';
import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useEffect } from 'react';
import Auth from '../data/Auth';

function ListaDeUsuarios({name="Cadastrado por:", value, onChange}) {

    const [options, setOptions] = useState([])
    
    useEffect(() => {
        Auth.getAllUsers().then((info) => {
            let todosColaboradores = info.data.filter(usuarios => usuarios.papel == 'colaborador')
            setOptions(todosColaboradores.map(colaborador => {return {label: colaborador.nome, value: colaborador.nome}}))
        })
    }, []);
    
    
    return (
        <div class="input-container" style={{'max-width': '500px'}}>
            <label>{name}</label>
            <Select options={options} onChange={onChange} defaultValue={[options[0]]}/>
        </div>
    );
}

export default ListaDeUsuarios;