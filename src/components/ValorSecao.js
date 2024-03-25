import '../css/valorSecao.css';

function ValorSecao({valor}) {
  return (
    <div class="valor-container">
        <span id='valor-secao'>{valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
    </div>
  );
}

export default ValorSecao;