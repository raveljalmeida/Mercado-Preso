import './Produto.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import EditProduto from '../EditProduto/EditProduto';

export default function Produto({id, nome, preco, desc, image, btnCtrl, deleting}) {

    const [mostrarEdit, setMostraEdit] = useState(false);

    const delet = async () => {

        try {
            const response = await axios.delete(`http://localhost:8000/products/${id}`, {
                withCredentials: true
            });
            toast.success('Produto excluído com sucesso');
            deleting();
        } catch (error) {
            toast.error('Erro ao excuir produto');
            console.log(error);
        }

    }

    return(
        <>
            <div id="card">
                <div id='img-container'><img src={image} alt="" /></div> 
                <p id='nome' >{nome}</p>
                <p id='preco' >R${preco}</p>
                {
                    btnCtrl ?
                    <div id='btnContainer'>
                      <button id='btnDelete' onClick={() => delet()}>Exluir</button>
                      <button id='btnEdit' onClick={() => setMostraEdit(true)}>Editar</button>
                    </div>:
                    <span></span>
                }
                <EditProduto 
                    isOpen={mostrarEdit}
                    onClose={() => setMostraEdit(false)}
                    id = {id}
                    nome = {nome}
                    preco = {preco}
                    desc = {desc}
                    image = {image}
                    refresh={() => deleting()}
                />
            </div>
            <ToastContainer />
        </>
    )

}