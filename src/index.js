import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import Controle from './pages/Controle';
import MensagemInicial from './pages/MensagemInicial';
import Formulario from './pages/Formulario';
import Relatorio from './pages/Relatorio';
import Login from './pages/Login'
import { Client } from 'appwrite';
import Auth from './data/Auth';
import PrivateRoutes from './components/PrivateRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes isAuthenticated={Auth.isAuthenticated()}/>}>
          <Route path="/" element={<MensagemInicial />} />
          <Route path='/inicio' element={<MensagemInicial />} />
          <Route path='/controle' element={<Controle />} />
          <Route path='/formulario' element={<Formulario />} />
          <Route path='/relatorio' element={<Relatorio />} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
