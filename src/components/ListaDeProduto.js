import '../css/Input.css';
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Produtos from '../data/Produtos'
import React, { useEffect, useState } from 'react';

class ListaDeProduto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            promiseOptions: () => new Promise((resolve) => {
                new Produtos().listarProdutos()
                    .then(produtos => {
                        let options = produtos.map(produto => {return {value: produto.descricao, label: produto.descricao}})
                        resolve(options)
                    })})
        };

    }   

    render() {
        return (
            <div class="input-container">
                <label>{this.props.name}</label>
                <AsyncSelect cacheOptions defaultOptions loadOptions={this.state.promiseOptions} onChange={this.props.onChange}/>
            </div>
        );
    } 
    
}

export default ListaDeProduto;