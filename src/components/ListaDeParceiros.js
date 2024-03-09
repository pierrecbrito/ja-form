import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function ListaDeParceiros({name, options, onChange, isOptionDisabled}) {

      
    
    return (
        <div class="input-container">
            <label>{name}</label>
            <Select options={options} onChange={onChange} isMulti  isOptionDisabled={isOptionDisabled}/>
        </div>
    );
}

export default ListaDeParceiros;