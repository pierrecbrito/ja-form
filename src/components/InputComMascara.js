import '../css/Input.css';
import InputMask from 'react-input-mask'

function InputComMascara({type, name, mask}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <InputMask  mask={mask}/>
    </div>
  );
}

export default InputComMascara;