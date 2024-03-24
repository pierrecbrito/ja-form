import '../css/Input.css';
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Produtos from '../data/Produtos'
import React, { useEffect, useState } from 'react';
import CardDocumento from './CardDocumento';
import Documentos from '../data/Documentos'
import CardInstalacao from './CardInstalacao';
import LinhaInstalacao from './LinhaInstalacao';
import LinhaPV from './LinhaPV';

class TabelaDocumentos extends React.Component {

    constructor(props) {
        super(props);

        this.style = {
            'display': 'flex',
            'justify-content': 'space-around',
            'align-items': 'start',
            'flex-wrap': 'wrap'
        }

        this.state = {
            documentos: []
        }

    }   

    componentDidMount() {
        Documentos.listarTodosDocumentos().then((result) => {
            let documentosDeInstalacao = result.data.documentos_instalacao
            let documentosDePosVenda = result.data.documentos_pos_venda
            this.setState({documentos: documentosDeInstalacao.concat(documentosDePosVenda)})

            this.props.setComissaoTotal(documentosDeInstalacao.reduce((a, b) => a + b.documento.cabecalho.comissao, 0))
            let cabecalhosContabilizados = []
            this.props.setTotalGeral(documentosDeInstalacao.reduce((a, b) => { if(!cabecalhosContabilizados.includes(b.documento.cabecalho.id)) {cabecalhosContabilizados.push(b.documento.cabecalho.id); return  a + b.documento.cabecalho.total; } else { return a } }, 0) + documentosDePosVenda.reduce((a, b) => { if(!cabecalhosContabilizados.includes(b.documento.cabecalho.id)) {cabecalhosContabilizados.push(b.documento.cabecalho.id); return  a + b.documento.cabecalho.total; } else { return a } }, 0))
        })
        
    }

    listandoDocumentos() {
        let lista = []
        let listaDeDocumentoFiltrados = []
        
        this.props.dataInicial.setHours(0)
        this.props.dataInicial.setMinutes(0)
        this.props.dataInicial.setSeconds(0)
        
        this.props.dataFinal.setHours(23)
        this.props.dataFinal.setMinutes(59)
        this.props.dataFinal.setSeconds(59)

        let documentoASeremAdicionadosEmOrdem = [...this.state.documentos]//Para não mexer no State
        documentoASeremAdicionadosEmOrdem.sort(function(a,b) {
            return new Date(a.documento.cabecalho.criado_em).getTime() - new Date(b.documento.cabecalho.criado_em).getTime()
        })

        //Itens de tabela e suas filtragens
        documentoASeremAdicionadosEmOrdem.forEach((documento) => {
            if(documento.nota_fiscal != undefined && (this.props.tipoDocumento == 'Todos' || this.props.tipoDocumento == 'Instalação')) {
                if(documento.dono.id == this.props.usuario || this.props.usuario == 'Todos') {
                    if(this.props.dataInicial.getTime() <= new Date(documento.documento.cabecalho.criado_em).getTime() && this.props.dataFinal.getTime() >= new Date(documento.documento.cabecalho.criado_em).getTime()) {
                        lista.push(<LinhaInstalacao  documento={documento}/>)
                        listaDeDocumentoFiltrados.push(documento)
                    }
                }
            } else {
                if(documento.nota_fiscal == undefined && (this.props.tipoDocumento == 'Todos' || this.props.tipoDocumento == 'PV')) {
                    if(documento.documento.cabecalho.usuario_criador.id == this.props.usuario || this.props.usuario == 'Todos') {
                        if(this.props.dataInicial.getTime() <= new Date(documento.documento.cabecalho.criado_em).getTime() && this.props.dataFinal.getTime() >= new Date(documento.documento.cabecalho.criado_em).getTime()) {
                            lista.push(<LinhaPV documento={documento}/>)
                            listaDeDocumentoFiltrados.push(documento)
                        }
                    }
                }
            }
        })


        console.log(listaDeDocumentoFiltrados)

        //Atualiza valores gerais do relatório
        this.props.setComissaoTotal(listaDeDocumentoFiltrados.filter(d => d.nota_fiscal != undefined).reduce((a, b) => a + b.documento.cabecalho.comissao, 0))
        let cabecalhosContabilizados = []
        this.props.setTotalGeral(listaDeDocumentoFiltrados.reduce((a, b) => { if(!cabecalhosContabilizados.includes(b.documento.cabecalho.id)) {cabecalhosContabilizados.push(b.documento.cabecalho.id); return  a + b.documento.cabecalho.total; } else { return a } }, 0) )
        
        
        return lista
    }


    render() {
        return (
            <table style={{'width':'100%', 'margin-top': '10px'}}>
                <thead>
                    <tr>
                        <th style={{'padding': '15px'}}>Status</th>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Usuário</th>
                        <th>Comissão</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.listandoDocumentos()}
                </tbody>
            </table>
        );
    } 
    
}

export default TabelaDocumentos;