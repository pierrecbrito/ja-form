import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import Controle from './pages/Controle';
import MensagemInicial from './pages/MensagemInicial';
import Formulario from './pages/Formulario';
import Relatorio from './pages/Relatorio';
import Login from './pages/Login'
import { Client } from 'appwrite';
import Auth from './data/Auth';
import PrivateRoutes from './components/PrivateRoutes';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65c4d9d1a09d06e65a7d');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <SlideRoutes duration={600}>
        
        <Route path='login' element={<Login />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<MensagemInicial />} />
          <Route path='inicio' element={<MensagemInicial />} />
          <Route path='controle' element={<Controle />} />
          <Route path='formulario' element={<Formulario />} />
          <Route path='relatorio' element={<Relatorio />} />
        </Route>
    </SlideRoutes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
