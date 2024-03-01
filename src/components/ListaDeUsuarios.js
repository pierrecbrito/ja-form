import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function ListaDeUsuarios({name="Cadastrado por:", value, onChange}) {

    const options = [
        { value: 'Casemiro', label: 'Casemiro' },
        { value: 'Bruno', label: 'Bruno' },
        { value: 'Lucas', label: 'Lucas' },
        { value: 'Fred', label: 'Fred' }
      ]
      
    
    return (
        <div class="input-container" style={{'max-width': '500px'}}>
            <label>{name}</label>
            <Select options={options} onChange={onChange} defaultValue={[options[0]]}/>
        </div>
    );
}

export default ListaDeUsuarios;