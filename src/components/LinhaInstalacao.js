import '../css/Input.css';
import React, { useEffect, useState } from 'react';
import Expand from '../maximize-2.svg'
import ReactModal from 'react-modal';
import '../css/CardDocumento.css'
import Expand2 from '../maximize-2.svg'
import Documentos from '../data/Documentos';
import toast, { Toaster } from 'react-hot-toast';

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
      borderRadius: '15px'
    },
  };

function LinhaInstalacao({documento}) {

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
    const [aprovado, setAprovado] = useState(true)
    const [reloadNecessary, setReloadNecessary] = useState(false)

    const toggleCabecalho = () => {
        Documentos.toggleCabecalho(documento.documento.cabecalho.id).then(result => {
            console.log(result)
        })

        setAprovado(!aprovado)
        setReloadNecessary(true)

        if(aprovado) {
            notificarEmailEnviado()
        }
    }

    useEffect(() => {
        setAprovado(documento.documento.cabecalho.aprovado)
    },[])

    const status = () => {
        if(aprovado) {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'padding': '0px', 'border-radius': '20rem', 'display': 'inline-block', 'border': '1px solid gray'}}>
                        <span style={{'background-color': 'rgba(0, 99, 65, 0.3)','padding': '10px', 'border-radius': '20rem', 'display': 'inline-block'}}>Deferido</span>
                        <span style={{'padding': '10px', 'border-radius': '20rem', 'display': 'inline-block', 'cursor': 'pointer'}} onClick={toggleCabecalho}>Indeferir</span>
                    </span>
                </div>
            )
        } else {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'padding': '0px', 'border-radius': '20rem', 'display': 'inline-block', 'border': '1px solid gray'}}>
                        <span style={{'padding': '10px', 'border-radius': '20rem', 'display': 'inline-block', 'cursor': 'pointer'}} onClick={toggleCabecalho}>Deferir</span>
                        <span style={{'background-color': 'rgba(145, 56, 49, 0.3)','padding': '10px', 'border-radius': '20rem', 'display': 'inline-block'}}>Indeferido</span>
                    </span>
                </div>
            )
        }
    }

    const statusReadOnly = () => {
        if(aprovado) {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'background-color': 'rgba(0, 99, 65, 0.3)','padding': '10px', 'border-radius': '20rem', 'display': 'inline-block'}}>Deferido</span>
                </div>
            )
        } else {
            return (
                <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                    <span style={{'background-color': 'rgba(145, 56, 49, 0.3)','padding': '10px', 'border-radius': '20rem', 'display': 'inline-block'}}>Indeferido</span>
                </div>
            )
        }
    }

    const notificarEmailEnviado = (erro) => {
        toast('E-mail enviado ao verificador.', {
            duration: 5000,
            position: 'bottom-center',
          
            // Styling
            style: {
                boxShadow: '0 1rem 3rem rgba(0,0,0,.175) !important',
                fontSize: '14px'
            },
            className: '',
          
            // Custom Icon
            icon: '✉️',
          
            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
        });
      } 
      
    return (
        <tr class="linha-documento" >
            <td className='coluna-documento'  style={{'padding': '5px'}}>{statusReadOnly()}</td>
            <td className='coluna-documento' style={{'cursor': 'pointer'}}>{documento.documento.cabecalho.nome}</td>
            <td className='coluna-documento'>{new Date(documento.documento.cabecalho.criado_em).toLocaleDateString('pt-BR', formatOptions)}h</td>
            <td className='coluna-documento'>Instalação</td>
            <td className='coluna-documento'>{documento.dono ? documento.dono.name :  documento.documento.cabecalho.usuario_criador.name}</td>
            <td className='coluna-documento'>{documento.documento.cabecalho.comissao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
            <td className='coluna-documento'><img src={Expand2} style={{top: '15px', right: '15px', width: '1em', 'cursor': 'pointer'}} onClick={() => {setShowModal(true)}}/></td>

            <ReactModal 
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                style={customStyles}

            >
                <header className='cabecalho_modal'>
                    Documento
                    <span className='btn-fechar-modal' onClick={() => {setShowModal(false); if(reloadNecessary) window.location.reload();}}>X</span>
                </header>
                <main className='body_modal' style={{maxHeight: '600px',overflow:'scroll'}}>
                    <div id="secoes-container">
                        {status()}
                        <div className='secao' style={{background: 'rgba(0, 99, 65, 0.3)', borderRadius: '15px', padding: '15px', marginTop: '10px'}}>
                            <h4 style={{'text-align': 'center'}}>Info gerais</h4>
                            <div className='secao-body'>
                                <div className='info'>Nome: {documento.documento.cabecalho.nome}</div>
                                <div className='info'>CNPJ: {documento.documento.cabecalho.cnpj}</div>
                                <div className='info'>CPF: {documento.documento.cabecalho.cpf}</div>
                                <div className='info'>Endereço: {documento.documento.cabecalho.endereco}</div>
                                <div className='info'>CEP: {documento.documento.cabecalho.cep}</div>
                                <div className='info'>Cidade: {documento.documento.cabecalho.cidade}</div>
                                <div className='info'>Telefone: {documento.documento.cabecalho.telefone}</div>
                                <div className='info'>Cadatrado por {documento.documento.cabecalho.usuario_criador.name} em {new Date(documento.documento.cabecalho.criado_em).toLocaleDateString('pt-BR', formatOptions)}h</div>
                                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total geral: R$ {documento.documento.cabecalho.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                            </div>
                        </div>
                        <div className='secao' style={{background: 'rgba(0, 99, 65, 0.3)', borderRadius: '15px', padding: '15px', marginTop: '10px'}}>
                            <h4 style={{'text-align': 'center'}}>Dados de serviços</h4>
                            <div className='secao-body'>
                                <div className='info'>Deslocamento: {documento.documento.cabecalho.info_adicionais.distancia}km</div>
                                <div className='info'>Horas trabalhadas: {documento.documento.cabecalho.info_adicionais.horas}h</div>
                                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total: {documento.documento.cabecalho.info_adicionais.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                                <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                                    <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Comissão: {documento.documento.cabecalho.comissao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                </div>
                            </div>
                        </div>
                        <div className='secao' style={{ borderRadius: '15px', padding: '15px', marginTop: '10px', border:'1px solid gray'}}>
                            <h4 style={{'text-align': 'center'}}>Instalação</h4>
                            <div style={{'text-align': 'center', 'font-size': '0.9rem'}}>
                                <span style={{'background-color': 'rgba(0, 99, 65, 0.3)','padding': '10px', 'border-radius': '20rem', 'display': 'inline-block'}}>Responsável: {documento.dono.name}</span>
                            </div>
                            <div className='secao-body'>
                                <div className='info'>Máquina: {documento.documento.maquina}</div>
                                <div className='info'>Linhas: {documento.documento.quantidade_linhas}</div>
                                <div className='info'>Número de máquina: {documento.documento.numero_maquina}</div>
                                <div className='info'>Máquina Nova: {documento.documento.maquina_nova ? 'Sim' : 'Não'}</div>
                                <div className='info'>Faturado Pela Revenda: {documento.documento.faturado_revenda}</div>
                                <div className='info'>Produto: {documento.documento.produto.name}</div>
                                <div className='info'>Serviços executados: {documento.documento.servicos_executados}</div>
                                <div className='info'>Testes realizados: {documento.documento.testes_realizados}</div>
                                <div className='info'>Parceiros: {documento.parceiros.map(p => p.name).join(",")}</div>
                                <div className='info'>Nota fiscal: {documento.nota_fiscal}</div>
                            </div>
                        </div>
                        <div style={{'text-align': 'right', 'marginTop': '10px'}}>
                            <span style={{'border-left':'5px solid #006341', 'background-color': 'rgba(0, 99, 65, 0.3)', 'padding': '10px', 'font-size': '0.8rem', 'display': 'inline-block'}}>Total: {documento.documento.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
                        </div>
                        <Toaster/>
                    </div>
                </main>
        
            </ReactModal>
        </tr>
    );
}

export default LinhaInstalacao;