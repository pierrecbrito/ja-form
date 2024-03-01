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

        new Documentos().listarDocumentosDeInstalacao()
            .then(documentosDeInstalacao => {
                new Documentos().listarDocumentosDePV()
                    .then(documentosDePV => {
                        this.props.setTotalGeral(documentosDeInstalacao.reduce((a, b) => a + b.cabecalho.total, 0) + documentosDePV.reduce((a, b) => a + b.cabecalho.total, 0))
                        this.props.setComissaoTotal(documentosDeInstalacao.reduce((a, b) => a + b.cabecalho.comissao, 0) + documentosDePV.reduce((a, b) => a + b.cabecalho.comissao, 0))
                        this.setState({documentos: documentosDeInstalacao.concat(documentosDePV)})
                    })
                
            })
        
    }

    listandoDocumentos() {
        let lista = []
        this.state.documentos.forEach((documento) => lista.push(documento.parceiros != undefined ? <LinhaInstalacao  documento={documento}/> : <LinhaPV documento={documento}/>))
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
                        <th>Produto</th>
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