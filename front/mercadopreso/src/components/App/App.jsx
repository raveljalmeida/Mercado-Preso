import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Produtos from '../Produtos/Produtos';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [loginCtrl, setLoginCtrl] = useState(false);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/verify', {
          withCredentials: true
        });

        setLoginCtrl(!!response.data);
      } catch {
        setLoginCtrl(false);
      }
    };

    verifyLogin();
  }, []);

  return (
    <BrowserRouter>
      <AppContent loginCtrl={loginCtrl} setLoginCtrl={setLoginCtrl} />
    </BrowserRouter>
  );
}

function AppContent({ loginCtrl, setLoginCtrl }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/logout', {},
        {withCredentials: true}
      );

      console.log(response.data);

      setLoginCtrl(false);
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <div id="app">
      <Header loginCtrl={loginCtrl} setLogin={() => setLoginCtrl(true)} />

      {loginCtrl && (
        <Link id="logout" onClick={logout}>
          Sair
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route
          path="/products"
          element={
            loginCtrl ? (
              <Produtos loginControle={() => setLoginCtrl(false)} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            loginCtrl ? (
              <Navigate to="/products" replace />
            ) : (
              <Login loginControle={() => setLoginCtrl(true)} />
            )
          }
        />
      </Routes>
    </div>
  );
}