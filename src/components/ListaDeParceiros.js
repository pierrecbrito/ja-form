import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function ListaDeParceiros({name, value, onChange, isOptionDisabled}) {

    const options = [
        { value: 'Casemiro', label: 'Casemiro' },
        { value: 'Bruno', label: 'Bruno' },
        { value: 'Lucas', label: 'Lucas' },
        { value: 'Fred', label: 'Fred' }
      ]
      
    
    return (
        <div class="input-container">
            <label>{name}</label>
            <Select options={options} onChange={onChange} isMulti  isOptionDisabled={isOptionDisabled}/>
        </div>
    );
}

export default ListaDeParceiros;