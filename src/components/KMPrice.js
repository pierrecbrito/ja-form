import '../css/KMPrice.css';
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

function KMPrice({valor}) {

  return (
    <div className='KMPrice'>
        <label>Valor do combustível por KM:</label>
        <IntlCurrencyInput currency="BRL" config={currencyConfig} max={200} value={valor}/>
    </div>
  );
}


export default KMPrice