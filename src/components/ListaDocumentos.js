import '../css/Input.css';
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Produtos from '../data/Produtos'
import React, { useEffect, useState } from 'react';
import CardDocumento from './CardDocumento';
import Documentos from '../data/Documentos'

class ListaDocumentos extends React.Component {

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
        new Documentos().listarDocumentos()
            .then(documentos => {
                this.props.setTotalGeral(documentos.reduce((a, b) => a + b.totalDocumento, 0))
                this.props.setComissaoTotal(documentos.reduce((a, b) => a + b.comissao, 0))
                this.setState({documentos: documentos})
            })
        
    }

    listandoDocumentos() {
        let lista = []
        this.state.documentos.forEach((documento) => lista.push(<CardDocumento documento={documento}/>))
        return lista
    }


    render() {
        return (
            <div class="container-documentos" style={this.style}>
                {this.listandoDocumentos()}
            </div>
        );
    } 
    
}

export default ListaDocumentos;