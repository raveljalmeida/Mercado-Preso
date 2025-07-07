import './Produto.css';

export default function Produto(nome, image) {

    return(
        <>
            <div id="card">
                <div id='img-container'><img src={nome.image} alt="" /></div> 
                <p id='nome' >{nome.nome}</p>
                <p id='preco' >R${nome.preco}</p>
            </div>
        </>
    )

}