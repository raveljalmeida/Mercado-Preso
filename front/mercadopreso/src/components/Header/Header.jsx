import './Header.css';
import Logo from '../../assets/Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

export default function Header({ loginCtrl, setLogin }) {

  const location = useLocation();

  return (
    <header>
      <Link to="/" >
        <img src={Logo} id="logo" />
      </Link>

      {location.pathname !== "/login" && (
        <nav>
          {!loginCtrl ? (
            <>
              <Link to="/login" >Entrar</Link>
              <Link to="/criar-conta">Crie a sua conta</Link>
            </>
          ) : (
            <span></span>
          )}
        </nav>
      )}
    </header>
  );
}
