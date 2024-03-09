import '../css/Input.css';
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Produtos from '../data/Produtos'
import React, { useEffect, useState } from 'react';

function ListaDeProduto({name, onChange, options}) {
    const [promiseOptions, setPromiseOptions] = useState(null) 
    
    
    return (
        <div class="input-container">
            <label>{name}</label>
            <Select options={options} onChange={onChange}/>
        </div>
    );
    
    
}



export default ListaDeProduto;