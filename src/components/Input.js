import '../css/Input.css';

function Input({type, name, value}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <input type={type} value={value}></input>
    </div>
  );
}

export default Input;