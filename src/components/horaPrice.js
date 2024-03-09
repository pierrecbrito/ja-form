import '../css/horaPrice.css';
import '../css/Suite.css';

import IntlCurrencyInput from "react-intl-currency-input";

const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      },
    },
  };

function HoraPrice({valor, onChange}) {

  return (
    <div className='horaPrice'>
        <label>Valor da hora de serviço:</label>
        <IntlCurrencyInput currency="BRL" config={currencyConfig} max={200} value={valor} onChange={onChange}/>
    </div>
  );
}


export default HoraPrice