
from datetime import datetime, timedelta, timezone

import mysql.connector
from fastapi import FastAPI, Response, Cookie
from fastapi.responses import RedirectResponse
from passlib.context import CryptContext
from pydantic import BaseModel
import jwt 

from email_validator import validate_email, EmailNotValidError


conexao = mysql.connector.connect(
    host = 'db-users',
    user = 'root',
    password = '1234',
    database = 'users',
    port = '3306'
)

cursor = conexao.cursor()

app = FastAPI()

SECRET_KEY = "17f33db1d7adfa657356d9fb0e1e639e86ceb90e12277362b99f80657e279bbc"
ALGORITHM = "HS256"

class Token(BaseModel):
    acess_token: str
    token_type: str

class User(BaseModel):
    nome: str
    email: str
    senha: str

class UserLogin(BaseModel):
    email: str
    senha: str

class Product(BaseModel):
    nome: str
    preco: str
    desc: str
    img: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/signup")
async def createUser(user: User, response: Response):
    pwdHashing = pwd_context.hash(user.senha)
    try:
        email = user.email
        validate_email(email, check_deliverability = False)
    except EmailNotValidError:
        return{"message": "Email inválido"}
    try:
        cursor.execute(f'INSERT INTO Usuarios (nomeUsuario, email, senha) VALUES ("{user.nome}", "{user.email}", "{pwdHashing}")')
        conexao.commit()
        token = create_access_token(data={"sub": user.nome})
        response.set_cookie(key="acess_token", value=token, httponly=True, secure=True)
        response = RedirectResponse(url="/products", status_code=303)
        return response
    except mysql.connector.Error as err:
        if err.errno == 1062:
            return {"message": f"O email {user.email} já está cadastrado"}


@app.post("/login")
async def login(userLogin: UserLogin, response: Response):
    try:
        cursor.execute(f"Select senha FROM users.Usuarios where email='{userLogin.email}'")
        senha = cursor.fetchall()[0][0]
        if pwd_context.verify(userLogin.senha, senha) is True:
            token = create_access_token(data={"sub": userLogin.email})
            response.set_cookie(key="acess_token", value=token, httponly=True, secure=True)
            return {"message": "Login efetuado com sucesso"}
        else:
            return {"message": "Usuário ou senha incorretos"}
    except:
        return {"message": "Usuário ou senha incorretos"}
    

@app.post("/products")
async def products(product: Product, acess_token: str = Cookie(default=None)):
    if not product.nome or not product.desc or not product.preco or not product.img:
        return {"message": "Todos os campos devem ser preenchidos"}
    try:
        jwt.decode(acess_token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return {"message": "Sem permissão"}
    try:
        preco = float(product.preco)
        cursor.execute(f'INSERT INTO Produtos (nomeProduto, descricao, preco, imgLink) VALUES ("{product.nome}", "{product.desc}", {preco}, "{product.img}")')
        conexao.commit()
        return {"message": "Produto cadastrado com sucesso"}
    except mysql.connector.Error as err:
        return {"message": "Erro ao cadastrar produto",
                "error": err
                }
    

@app.get("/products")
async def getProucts(acess_token: str = Cookie(default=None)):
    """ try:
        jwt.decode(acess_token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return {"message": "Sem permissão"} """
    try:
        produtos = []
        produto = {}
        cursor.execute('SELECT nomeProduto, descricao, preco, imgLink FROM users.Produtos')
        consulta = cursor.fetchall()
        for prod in consulta:
            produto = {
                "nome": prod[0],
                "descrição": prod[1],
                "preço": prod[2],
                "imagem": prod[3]
            }
            produtos.append(produto)
        return produtos
    except:
        return {"message": "Erro ao buscar produtos"}
    

@app.delete("/products/{id}")    
async def deleteProducts(id, acess_token: str = Cookie(default=None)):
    try:
        jwt.decode(acess_token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return {"message": "Sem permissão"}
    try:
        cursor.execute(f'DELETE FROM Produtos WHERE idProduto={int(id)}')
        conexao.commit()
        return {"message": "produto deletado com sucesso"}
    except mysql.connector.Error as err:
        return {"message": "erro ao deletar produto",
                "error": err
                }
    

@app.put("/products/{id}")
async def editProduct(product: Product, id, acess_token: str = Cookie(default=None)):
    try:
        jwt.decode(acess_token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        return {"message": "Sem permissão"}
    try:
        cursor.execute(f'SELECT idProduto FROM users.Produtos WHERE idProduto={int(id)}')
        consulta = cursor.fetchall()
        if not consulta:
            return{"message": "Não existe produto com o id informado"}
        cursor.execute(f'UPDATE Produtos SET nomeProduto="{product.nome}", descricao="{product.desc}", preco="{float(product.preco)}", imgLink="{product.img}" WHERE idProduto={int(id)}')
        conexao.commit()
        return {"message": "produto editado com sucesso"}
    except mysql.connector.Error as err:
        return {"message": "erro ao editar produto",
                "error": err
                }


@app.post("/logout")
async def logout(response: Response, acess_token: str = Cookie(default=None)):
    try:
        jwt.decode(acess_token, SECRET_KEY, algorithms=[ALGORITHM])
        response.delete_cookie(key="acess_token")
        return {"message": "Sessão encerrada"}
    except:
        return {"message": "Sem permissão"}