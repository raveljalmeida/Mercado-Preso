import './Produtos.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Banner from '../../assets/banner.png'
import { useEffect, useState } from 'react';
import Produto from '../Produto/Produto';

export default function Produtos() {

    const [produtosFake, setProdutosFake] = useState([]);
    const [produtosDb, setProdutosDb] = useState([]);

    useEffect(() => {

        const fetchDataFakeStore = async () => {

            const response = await axios.get('https://fakestoreapi.com/products');

            setProdutosFake(response.data);

        }

        const fetchDataBase = async () => {

            const response = await axios.get('http://localhost:8000/products');

            setProdutosDb(response.data);

            console.log(response.data)

        }

        fetchDataFakeStore();
        fetchDataBase();

    }, []);

    return(
        <>
            <div id="banner-container">
                <img src={Banner} alt="" id="banner"/>
                <div id='cards-container'>
                
                    {produtosFake.map(produto => (
                        <Produto 
                            key = {produto.id}
                            nome = {produto.title}
                            preco = {produto.price}
                            image = {produto.image}
                        />
                    ))}

                    {produtosDb.map(produto => (
                        <Produto 
                            key = {produto.id}
                            id = {produto.id}
                            nome = {produto.nome}
                            preco = {produto.preço}
                            image = {produto.imagem}
                            btnCtrl = {false}
                        />
                    ))}
                </div>
            </div>
        </>
    )

}