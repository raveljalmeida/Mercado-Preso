import './Login.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {validate} from 'react-email-validator';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login({loginControle}){

    const navigate = useNavigate();

    const form = useForm();

    const {register, handleSubmit} = form;

    const submit = async (data) => {

        if (validate(data.email)){

            try {
                
                const response = await axios.post('http://localhost:8000/login', data, {
                    withCredentials: true
                });

                if(response.status === 200){
                    loginControle();
                    navigate('/products');
                }else{
                    toast.error("Email ou senha incorretos");
                }

            } catch(error){
                toast.error("Email ou senha incorretos");
                console.log(error)
            }
                
        } else {

            toast.warning('O email informado não é válido!');

        }
    }

    return(
        <>
            <section id='login'>
                <p id='txtLogin'>Digite seu e-mail e senha para iniciar a sessão</p>
                <form onSubmit={handleSubmit(submit)}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className='email' required {...register('email')}/>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className='senha' required {...register('senha')}/>
                    <button type='submit'>Continuar</button>
                    <button type='button' id='createCount'>Criar conta</button>
                    <ToastContainer />
                </form>
            </section>
        </>
    )

}