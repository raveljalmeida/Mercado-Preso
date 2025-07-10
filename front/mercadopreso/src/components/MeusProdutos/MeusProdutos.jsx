import './MeusProdutos.css';
import Produto from '../Produto/Produto';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduto from '../AddProduto/AddProduto';

export default function MeusProdutos() {

    const [mostrarAdd, setMostrarAdd] = useState(false);

    const [produtosDb, setProdutosDb] = useState([]);

    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {

        const fetchDataBase = async () => {

            const response = await axios.get('http://localhost:8000/products');

            setProdutosDb(response.data);

            console.log(response.data)

        }

        fetchDataBase();
    
    }, [refresh]);

    return (
        <>
            <section id='containerMyProd'>
                <p id='myProdTitle'>Produtos Cadastrados</p>

                <div id='cards-container'>
                    {produtosDb.map(produto => (
                        <Produto 
                            key = {produto.id}
                            id = {produto.id}
                            nome = {produto.nome}
                            preco = {produto.preço}
                            desc = {produto.descrição}
                            image = {produto.imagem}
                            btnCtrl = {true}
                            deleting = {() => setRefresh(!refresh)}
                        />
                    ))}
                </div>
                <button id='btnAdd' onClick={() => setMostrarAdd(true)}>Cadastrar Produto</button>
                <AddProduto
                    isOpen={mostrarAdd}
                    onClose={() => setMostrarAdd(false)}
                    refresh={() => {
                        setRefresh(!refresh) 
                        setMostrarAdd(false)
                    }}
                />
            </section>

        </>
    )

}