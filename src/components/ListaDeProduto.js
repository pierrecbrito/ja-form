import '../css/Input.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

function ListaDeProduto({name}) {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      
    
    return (
        <div class="input-container">
            <label>{name}</label>
            <Select options={options} components={animatedComponents} isMulti/>
        </div>
    );
}

export default ListaDeProduto;