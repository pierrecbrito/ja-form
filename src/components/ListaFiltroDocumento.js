import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function ListaFiltroDocumento({name="Tipo de documento", value, onChange}) {

    const options = [
        { value: 'Todos', label: 'Todos' },
        { value: 'Instalação', label: 'Instalação' },
        { value: 'PV', label: 'Pós-venda' },
      ]
      
    
    return (
        <div class="input-container" style={{'max-width': '500px'}}>
            <label>{name}</label>
            <Select options={options} onChange={onChange} defaultValue={[options[0]]}/>
        </div>
    );
}

export default ListaFiltroDocumento;