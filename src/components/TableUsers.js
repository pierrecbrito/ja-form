import '../css/Table.css';
import '../css/Suite.css';
import Auth from '../data/Auth';
import { useState, useEffect } from 'react';

function TableUsers({atualizarTabela, setAtualizarTabela}) {
  const [usuarios, setUsuarios] = useState('Carregando...')

  const atualizar = () => {
    Auth.getAllUsers().then((response) => {
        setUsuarios(
          response.data.map((usuario) =>   //Constrói uma linha de tabela para cada produto no banco
            <tr className='linha'>
              <td>{usuario.nome}</td>
              <td>{usuario.email} </td>
              <td>{usuario.papel}</td>
            </tr>
        ))
    })
  }

  useEffect(() => {
    atualizar()
  }, []);


  return (
    <table className='tabela'>
      <thead className='tabela-cabecalho'>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        {usuarios}
      </tbody>
    </table>
  );
}

export default TableUsers;