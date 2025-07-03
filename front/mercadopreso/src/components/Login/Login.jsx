import './Login.css'
import {useForm} from 'react-hook-form';
import axios from 'axios';

export default function Login(){

    return(
        <>
            <section id='login'>
                <p id='txtLogin'>Digite seu e-mail e senha para iniciar a sessão</p>
                <form action="">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className='email' required/>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className='senha' required/>
                    <button type='submit'>Continuar</button>
                    <button id='createCount'>Criar conta</button>
                </form>
            </section>
        </>
    )

}