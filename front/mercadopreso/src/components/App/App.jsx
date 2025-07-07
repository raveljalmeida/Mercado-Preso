import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Produtos from '../Produtos/Produtos';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App(){

  const [loginCtrl, setLoginCtrl] = useState(false);

  useEffect(() => {

    const verifyLogin = async () => {

      const response = await axios.get('http://localhost:8000/verify', {
      withCredentials: true
      });

      if(response.data){
        setLoginCtrl(true);
      }else{
        setLoginCtrl(false);
      }

    }

    verifyLogin();

  } ,[])
 
  return(
    <>
      <BrowserRouter>
        <div id='app'>
          <Header></Header>
          <Routes>
            <Route path='/' element= {<Produtos />} /* {loginCtrl ? <Navigate to="/products" replace/> : <Login loginControle = {() => setLoginCtrl(true)}/>} *//>
            <Route path='/products' element={loginCtrl ? <Produtos loginControle = {() => setLoginCtrl(false)}/> : <Navigate to="/" replace/>} />
            <Route path='/login' element={loginCtrl ? <Navigate to="/products" replace/> : <Login loginControle = {() => setLoginCtrl(true)}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}
