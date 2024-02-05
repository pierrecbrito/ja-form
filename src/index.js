import React from 'react';
import ReactDOM from 'react-dom/client';
import Inicial from './pages/Inicial';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import Dashboard from './pages/Dashboard';
import Controle from './pages/Controle';
import MensagemInicial from './pages/MensagemInicial';
import Formulario from './pages/Formulario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SlideRoutes duration={600}>
        <Route path="/" element={<Inicial />}/>
        <Route path='login' element={<Login />} />
        <Route path='inicio' element={<MensagemInicial />} />
        <Route path='controle' element={<Controle />} />
        <Route path='formulario' element={<Formulario />} />
    </SlideRoutes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
