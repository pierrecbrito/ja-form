import { useState } from 'react';
import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useEffect } from 'react';
import Auth from '../data/Auth';

function ListaDeUsuarios({name="Usuário:", value, onChange}) {

    const [options, setOptions] = useState([])
    
    useEffect(() => {
        Auth.getAllUsers().then((info) => {
            let todosColaboradores = info.data.users//.filter(usuarios => usuarios.role == 'Colaborador')
            let colaboradores = [{label: 'Todos', value: 'Todos'}]

            todosColaboradores = todosColaboradores.map(colaborador => {return {label: colaborador.name, value: colaborador.id}})
            
            setOptions(colaboradores.concat(todosColaboradores))
        })
    }, []);
    
    
    return (
        <div class="input-container" style={{'max-width': '500px'}}>
            <label>{name}</label>
            <Select options={options} onChange={onChange} defaultValue={[{label: 'Todos', value: 'Todos'}]}/>
        </div>
    );
}

export default ListaDeUsuarios;