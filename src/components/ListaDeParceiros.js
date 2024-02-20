import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function ListaDeParceiros({name, value, onChange}) {

    const options = [
        { value: 'Casemiro', label: 'Casemiro' },
        { value: 'Bruno', label: 'Bruno' },
        { value: 'Lucas', label: 'Lucas' }
      ]
      
    
    return (
        <div class="input-container">
            <label>{name}</label>
            <Select options={options} onChange={onChange}/>
        </div>
    );
}

export default ListaDeParceiros;