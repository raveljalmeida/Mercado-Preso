import './Signup.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {validate} from 'react-email-validator';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signup(){

    const navigate = useNavigate();

    const form = useForm();

    const {register, handleSubmit} = form;

    const submit = async (data) => {

        if(validate(data.email)){
            if(data.senha.length<=3){
                toast.error('Senha fraca');
            }else{
                if(data.senha != data.confirmSenha){
                    toast.error('As senhas digitadas são diferentes');
                }else{
                    try {
                        const response = await axios.post('http://localhost:8000/signup', data);

                        console.log(response);

                        toast.success('Usuário cadastrado com sucesso');

                        navigate('/login');

                    }catch (error) {
                        if(error.response.status === 409){
                            toast.error('Já existe uma conta com este e-mail');
                        }else{
                            toast.error('Erro ao cadastrar usuário');
                        }
                    }
                }
            }
        }else{
            toast.error('E-mail inválido');
        }

    }

    return(
        <>
            <section id='container-signup'>
                <p>Cadastre-se para anunciar</p>
                <form onSubmit={handleSubmit(submit)} id='signup'>
                    <input type="text" placeholder='Nome de Usuário' required {...register('nome')}/>
                    <input type="email" placeholder='E-mail' required {...register('email')}/>
                    <input type="password" placeholder='Senha' required {...register('senha')}/>
                    <input type="password" placeholder='Confirmar senha' required {...register('confirmSenha')}/>
                </form>
                <button type='submit' form='signup'>Criar Conta</button>
            </section>
            <ToastContainer />
        </>
    )

}