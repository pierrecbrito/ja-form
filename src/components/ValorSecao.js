import '../css/valorSecao.css';

function ValorSecao({valor}) {
  return (
    <div class="valor-container">
        <span id='valor-secao'>R$ {valor.toFixed(2)}</span>
    </div>
  );
}

export default ValorSecao;