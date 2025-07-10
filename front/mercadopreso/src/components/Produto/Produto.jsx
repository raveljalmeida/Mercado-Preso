import './Produto.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Produto({id, nome, preco, image, btnCtrl, deleting}) {

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
            </div>
            <ToastContainer />
        </>
    )

}