import './EditProduto.css';
import CurrencyInput from 'react-currency-input-field';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function EditProduto({ isOpen, onClose, id, nome, preco, desc, image, refresh }) {

    const form = useForm();

    const {register, handleSubmit} = form;

    const submit = async (data) => {

        const preco = data.preco.slice(3).replace(/\./g, "").replace(/,/g, ".");

        data.preco = preco;

        console.log(id)

        try {
            const response = await axios.put(`http://localhost:8000/products/${id}`, data, {
            withCredentials: true
        });
            toast.success('Produto editado com sucesso');
            refresh();
        } catch (error) {
            toast.error('Erro ao editar produto');
        }

    }
    
    if (!isOpen) return null;

    return (

        <>
            <div className="add-produto-overlay" onClick={onClose}>
                <div className="add-produto-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="fechar-modal" onClick={onClose}>×</button>
                    <div className="conteudo">
                        <p>Editar produto</p>
                        <form id='formEdit' onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder='Nome' required defaultValue={nome} {...register('nome')}/>
                        <CurrencyInput 
                            required
                            decimalSeparator=',' 
                            groupSeparator={false}
                            decimalScale={2}
                            decimalsLimit={2}
                            placeholder='R$00,00'
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            defaultValue={preco}
                            {...register('preco')}
                        />
                        <input type="text" placeholder='Descrição' required defaultValue={desc} {...register('desc')}/>
                        <input type="text" placeholder='Link da imagem' required defaultValue={image} {...register('img')}/>
                        </form>
                        <button id='edit' type='submit' form='formEdit'>Editar</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>

    )

}