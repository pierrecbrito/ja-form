import '../css/Input.css';

function Input({type, name, value, onChange}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <input type={type} value={value} onChange={onChange}></input>
    </div>
  );
}

export default Input;