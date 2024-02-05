import '../css/KMPrice.css';
import '../css/Suite.css';
import $ from 'jquery'
import Input from './Input';



function KMPrice() {

  return (
    <div className='KMPrice'>
        <Input type='number' name='Preço por Kilometro:'/>
    </div>
  );
}


export default KMPrice