import './Header.css'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header(){

    const [ ctrlEntry, setCtrlEntry ] = useState(false);

    return (
        <>
          <header>
            <Link to="/" onClick={() => setCtrlEntry(false)}><img src={Logo} id='logo'/></Link>
            {
              ctrlEntry ? 
              <nav>
              </nav> :
              <nav>
                <Link to='/login' onClick={() => setCtrlEntry(true)}>Entrar</Link>
                <Link>Crie a sua conta</Link>
              </nav>
            }
            
          </header>
        </>
    )

}