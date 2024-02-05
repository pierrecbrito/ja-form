import '../css/InputRadio.css';

function InputRadio({id, name, value}) {
  return (
    <div class="input-container">
      <input id={id} type="checkbox" value={value}></input>
      <label for={id}>{name}</label>
    </div>
  );
}

export default InputRadio;