import '../css/InputRadio.css';

function InputRadio({id, name, checked, onChange}) {
  return (
    <div class="input-container">
      <input id={id} type="checkbox" checked={checked} onChange={onChange}></input>
      <label for={id}>{name}</label>
    </div>
  );
}

export default InputRadio;