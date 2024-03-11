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

        Documentos.listInstalacoes()
            .then(documentosDeInstalacao => {
                Documentos.listPosVendas()
                    .then(documentosDePV => {
                        let cabecalhosContabilizados = []
                        this.props.setTotalGeral(documentosDeInstalacao.data.reduce((a, b) => { if(!cabecalhosContabilizados.includes(b._cabecalho.id)) {cabecalhosContabilizados.push(b._cabecalho.id); return  a + b._cabecalho.total; } else { return a } }, 0) + documentosDePV.data.reduce((a, b) => { if(!cabecalhosContabilizados.includes(b._cabecalho.id)) {cabecalhosContabilizados.push(b._cabecalho.id); return  a + b._cabecalho.total; } else { return a } }, 0))
                        this.props.setComissaoTotal(documentosDeInstalacao.data.reduce((a, b) => a + b._cabecalho.comissao, 0))
                        this.setState({documentos: documentosDeInstalacao.data.concat(documentosDePV.data)})
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