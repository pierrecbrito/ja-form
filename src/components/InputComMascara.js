import '../css/Input.css';
import InputMask from 'react-input-mask'

function InputComMascara({type, name, mask, value, onChange}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <InputMask  mask={mask} value={value} onChange={onChange}/>
    </div>
  );
}

export default InputComMascara;