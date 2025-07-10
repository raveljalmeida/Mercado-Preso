import './AddProduto.css';
import CurrencyInput from 'react-currency-input-field';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export default function AddProduto({ isOpen, onClose, refresh }) {

  const form = useForm();

  const {register, handleSubmit, reset} = form;

  useEffect(() => {

    if (!isOpen){
      reset();
    }

  },[isOpen]) 

  const submit = async (data) => {

    const preco = data.preco.slice(3).replace(/\./g, "").replace(/,/g, ".");

    data.preco = preco

    try {
        const response = await axios.post("http://localhost:8000/products", data, {
            withCredentials: true
        });
        toast.success('Produto cadastrado com sucesso');
        refresh();
    } catch (error) {
        console.log(preco);
        console.log(error);
    }

  }

  if (!isOpen) return null;

  return (
    <>
      <div className="add-produto-overlay" onClick={onClose}>
        <div className="add-produto-modal" onClick={(e) => e.stopPropagation()}>
          <button className="fechar-modal" onClick={onClose}>×</button>
          <div className="conteudo">
            <p>Cadastrar produto</p>
            <form onSubmit={handleSubmit(submit)} id='formAdd'>
              <input type="text" placeholder='Nome' required {...register('nome')}/>
              <CurrencyInput 
                required
                decimalSeparator=',' 
                groupSeparator={false}
                decimalScale={2}
                decimalsLimit={2}
                placeholder='R$00,00'
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                {...register('preco')}
              />
              <input type="text" placeholder='Descrição' required {...register('desc')}/>
              <input type="text" placeholder='Link da imagem' required {...register('img')}/>
            </form>
            <button id='add' type='submit' form='formAdd'>Cadastrar</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
