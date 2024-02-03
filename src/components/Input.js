import '../css/Input.css';

function Input({type, name}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <input type={type}></input>
    </div>
  );
}

export default Input;