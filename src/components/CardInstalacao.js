import '../css/Input.css';
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Produtos from '../data/Produtos'
import React, { useEffect, useState } from 'react';
import Expand from '../maximize-2.svg'
import ReactModal from 'react-modal';
import Card from './Card';
import '../css/CardDocumento.css'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '700px',
      maxHeight: '600px',
      overflow:'scroll'
    },
  };

function CardInstalacao({documento}) {

    const style = {
        'max-width': '300px',
        'border-radius': '15px',
        'border': '2px solid rgb(159, 159, 167)',
        'width': '32%',
        'margin-top': '15px'
    }

    var formatOptions = { //Date format
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour:   '2-digit', 
        minute: '2-digit',
        hour12: false
    };

    const [showModal, setShowModal] = useState(false)

    const status = () => {
        if(documento.aprovado) {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'background-color': 'rgba(0, 99, 65, 0.3)', 'border-radius': '20rem', 'padding': '10px', 'display': 'inline-block', 'margin': '0 0 10px 0'}}>Deferido</span>
                </div>
            )
        } else {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'background-color': 'rgba(229, 9, 20, 0.3)', 'border-radius': '20rem', 'padding': '10px', 'display': 'inline-block', 'margin': '0 0 10px 0'}}>Indeferido</span>
                </div>
            )
        }
    }
    
    return (
        <div class="card-documento" style={style}>
            <h3 style={{'background-color': '#006341', 'color': '#FFFFFF', 'padding': '15px', 'margin': 0, 'border-radius': '10px 10px 0 0', 'font-size': '.8rem'}}>{documento.nome}</h3>
            <div style={{'padding': '15px', 'position': 'relative'}}>
                <img src={Expand} style={{'position': 'absolute', top: '15px', right: '15px', width: '1em', 'cursor': 'pointer'}} onClick={() => {setShowModal(true)}}/>

                {status()}

                <div style={{'text-align': 'left', 'font-size': '0.9rem'}}>
                    <span>Data: {new Date(documento.$createdAt).toLocaleDateString('pt-BR', formatOptions)}</span>
                </div>
                <div style={{'text-align': 'left', 'font-size': '0.9rem', 'marginTop': '5px'}}>
                    <span>Produto: {documento.produto}</span>
                </div>
                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total: R$ {documento.total} </span>
                </div>
                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Comissão: R$ {documento.cabecalho.comissao}</span>
                </div>
            </div> 

            <ReactModal 
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                style={customStyles}

            >
                <header className='cabecalho_modal'>
                    Documento
                    <span className='btn-fechar-modal' onClick={() => {setShowModal(false)}}>X</span>
                </header>
                <main className='body_modal'>
                    <div id="secoes-container">
                        {status()}
                        <div className='secao'>
                            <h4 style={{'text-align': 'center'}}>Info gerais</h4>
                            <div className='secao-body'>
                                <div className='info'>Nome: {documento.cabecalho.nome}</div>
                                <div className='info'>CNPJ: {documento.cabecalho.cnpj}</div>
                                <div className='info'>CPF: {documento.cabecalho.cpf}</div>
                                <div className='info'>Endereço: {documento.cabecalho.endereco}</div>
                                <div className='info'>CEP: {documento.cabecalho.cep}</div>
                                <div className='info'>Cidade: {documento.cabecalho.cidade}</div>
                                <div className='info'>Telefone: {documento.cabecalho.telefone}</div>
                            </div>
                        </div>
                        <div className='secao'>
                            <h4 style={{'text-align': 'center'}}>Dados de serviços</h4>
                            <div className='secao-body'>
                                <div className='info'>Deslocamento: {documento.cabecalho.docInfo.distancia}km</div>
                                <div className='info'>Horas trabalhadas: {documento.cabecalho.docInfo.horas}h</div>
                                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Comissão: R$ {documento.cabecalho.comissao}</span>
                                </div>
                            </div>
                        </div>
                        <div className='secao'>
                            <h4 style={{'text-align': 'center'}}>Instalacao</h4>
                            <div className='secao-body'>
                                <div className='info'>Máquina: {documento.maquina}</div>
                                <div className='info'>Linhas: {documento.quantLinhas}</div>
                                <div className='info'>Número de máquina: {documento.numeroMaquina}</div>
                                <div className='info'>Máquina Nova: {documento.maquinaNova ? 'Sim' : 'Não'}</div>
                                <div className='info'>Faturado Pela Revenda: {documento.faturadoRevenda}</div>
                                <div className='info'>Produto: {documento.produto}</div>
                                <div className='info'>Serviços executados: {documento.servicosExecutados}</div>
                                <div className='info'>Teste realizados: {documento.testesRealizados}</div>
                                <div className='info'>Parceiros: {documento.parceiros}</div>
                                <div className='info'>Parceiros: {documento.notaFiscal}</div>
                            </div>
                        </div>
                        <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                            <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total: R$ {documento.total} </span>
                        </div>
                    </div>
                </main>
        
            </ReactModal>
        </div>
    );
}

export default CardInstalacao;