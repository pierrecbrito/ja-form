import '../css/Input.css';
import Select from 'react-select'

function ListaFiltroStatus({name="Status de documento:", value, onChange}) {

    const options = [
        { value: 'Qualquer', label: 'Qualquer' },
        { value: 'Deferido', label: 'Deferido' },
        { value: 'Indeferido', label: 'Indeferido' },
      ]
      
    
    return (
        <div class="input-container" style={{'max-width': '500px', 'display': 'inline-block', 'min-width': '47.7%'}}>
            <label>{name}</label>
            <Select options={options} onChange={onChange} defaultValue={[options[0]]}/>
        </div>
    );
}

export default ListaFiltroStatus;