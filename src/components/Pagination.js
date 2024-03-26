import '../css/Input.css';
import React, { useEffect, useState } from 'react';
import '../css/CardDocumento.css'

function Pagination({quantidadeItens, paginaAtual, setPaginaAtual, itensPorPagina}) {

    const [totalPagina, setTotalPagina] = useState(0)

    useEffect(() => {
        console.log('totalPaginas', quantidadeItens > 15 ? quantidadeItens/15 + (quantidadeItens % 15 == 0 ? 0 : 1) : 1)
        setTotalPagina(quantidadeItens > 15 ? quantidadeItens/15 + (quantidadeItens % 15 == 0 ? 0 : 1) : 1)
        console.log('pagina atual', paginaAtual)
    },[])

    const getPaginacao = () => {
        console.log('totalPaginas', quantidadeItens/15 + quantidadeItens % 15 == 0 ? 0 : 1)
        let options = []
        for(let i = 1; i <= (quantidadeItens/15 + (quantidadeItens % 15 == 0 ? 0 : 1)); i++) {
            if(i <= 10) {
                options.push(paginaOption(i))
            }
        }
        return options
    }

    const paginaOption = (index) => {
        return (
            <div onClick={(e) => {setPaginaAtual(index)}} style={index == paginaAtual ?  {'padding': '10px 15px', 'backgroundColor': '#006341', 'color': '#FFFFFF', 'margin-right': '10px', 'cursor': 'pointer'} : {'padding': '10px 15px', 'backgroundColor': '#F1F1F1', 'margin-right': '10px', 'cursor': 'pointer'}}>{index}</div>
        )
    }

    const paginaOptionAvancar = () => {
        return (
            <div onClick={(e) => {if(paginaAtual<totalPagina) setPaginaAtual(paginaAtual+1)}} style={paginaAtual < totalPagina ?  {'padding': '10px 15px', 'backgroundColor': '#F1F1F1', 'margin-right': '10px', 'cursor': 'pointer'} : {'padding': '10px 15px', 'backgroundColor': '#F1F1F1', 'margin-right': '10px'}}>Avançar</div>
        )
    }

    const paginaOptionRetornar = () => {
        return (
            <div onClick={(e) => {if(paginaAtual > 1) setPaginaAtual(paginaAtual-1)}} style={paginaAtual > 1 ?  {'padding': '10px 15px', 'backgroundColor': '#F1F1F1', 'margin-right': '10px', 'cursor': 'pointer'} : {'padding': '10px 15px', 'backgroundColor': '#F1F1F1', 'margin-right': '10px'}}>Voltar</div>
        )
    }


    return (
        <div style={{'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'maxWidth': '400px', 'margin': '16px auto', 'marginTop':'16px'}}>
           {paginaOptionRetornar()} {getPaginacao()} {paginaOptionAvancar()}
        </div>
    );
}

export default Pagination;