import '../css/Input.css';
import InputMask from 'react-input-mask'
import IntlCurrencyInput from "react-intl-currency-input";

const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

function InputDinheiro({name, value, onChange}) {
  return (
    <div class="input-container">
        <label>{name}</label>
        <IntlCurrencyInput currency="BRL" config={currencyConfig} value={value} onChange={onChange} />
    </div>
  );
}

export default InputDinheiro;