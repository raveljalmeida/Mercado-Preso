# 🛒 Mercado Preso

> "Com o avanço do e-commerce e do mercado chinês, como Shopee, AliExpress, Shein, etc., as coisas acabaram ficando complicadas para o Perigo.  
>  
> Nas ruas do Brooklyn, os produtos ‘caídos do caminhão’ começaram a perder espaço. Essas plataformas ofereciam preços tão competitivos que até os negócios menos convencionais precisaram se adaptar.  
>  
> Foi então que nasceu o **Mercado Preso** — a resposta do Perigo às novas exigências do mercado. Uma plataforma de vendas onde a procedência é duvidosa, mas o desconto é garantido (ou quase)."

---

## 🧾 Descrição do Projeto

O **Mercado Preso** é uma aplicação web de e-commerce desenvolvida com fins educacionais e satíricos. Inspirado em plataformas reais como Mercado Livre e Shopee, e na icônica série _Todo Mundo Odeia o Chris_, o sistema simula a operação de um marketplace com foco em humor e aprendizado.

A aplicação oferece funcionalidades essenciais de um sistema de vendas:

- Cadastro, listagem e exclusão de produtos
- Login e logout com autenticação segura por cookie JWT
- Proteção de rotas baseada em autenticação

---

## ⚙️ Tecnologias Utilizadas

- **Frontend:** React.js + Vite
- **Backend:** FastAPI (Python)
- **Banco de Dados:** MySQL
- **Autenticação:** JWT via cookies
- **Estilização:** CSS puro
- **Bibliotecas:** Axios, React Router DOM, React Hook Form, Toastify
- **Ambiente de desenvolvimento:** Docker e Docker Compose

---

## ❓ Qual problema o projeto resolve?

Este projeto foi criado para simular, de maneira prática e bem-humorada, os principais desafios de um desenvolvedor web full-stack, incluindo:

- Integração entre frontend e backend via REST API
- Autenticação segura com JWT e controle de sessão via cookies
- Gerenciamento de estado e rotas com React
- Estruturação de componentes reutilizáveis
- Tratamento de erros e feedbacks ao usuário

---

## ❗ Por que esse problema é importante?

Mesmo em tom de paródia, o projeto resolve problemas reais enfrentados por iniciantes e intermediários:

- Aprender a proteger rotas com base em autenticação
- Tratar requisições HTTP com e sem credenciais
- Evitar falhas comuns de CORS, status codes e comunicação entre servidores
- Trabalhar com banco de dados relacionais e persistência de dados
- Aprender organização de código, reatividade e componentização no React

Ao praticar com um projeto como este, o desenvolvedor consegue absorver diversos conceitos importantes de forma leve e divertida — transformando aprendizado técnico em uma experiência criativa.

---

## Instruções para Executar o Projeto

Siga os passos abaixo para executar o projeto corretamente em sua máquina local. Considera-se que o repositório já foi clonado previamente.

1. **Pré-requisitos**:
   - Certifique-se de que os seguintes programas estão instalados:
     - [Docker](https://www.docker.com/)
     - [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/)
   - O projeto foi desenvolvido em ambiente Linux. Recomenda-se utilizar o mesmo sistema operacional ou, se estiver usando Windows, utilize o WSL (Windows Subsystem for Linux) para evitar incompatibilidades.

2. **Abrir dois terminais**:
   - Um terminal será utilizado para o **backend**.
   - Outro terminal será utilizado para o **frontend**.

3. **Iniciar o backend**:
   - No terminal do backend, navegue até a **pasta raiz do projeto** (onde está o arquivo `docker-compose.yml`).
   - Execute o seguinte comando para construir e iniciar os containers (incluindo o servidor e o banco de dados):
     ```bash
     docker compose up --build
     ```

4. **Iniciar o frontend**:
   - No terminal do frontend, navegue até a pasta do frontend:
     ```bash
     cd front/mercadopreso
     ```
   - Instale as dependências do projeto com:
     ```bash
     npm install
     ```
   - Após a instalação, inicie o frontend com:
     ```bash
     npm run dev
     ```

Após seguir esses passos, o backend e o frontend do projeto estarão rodando localmente.

---

## 📌 Status do Projeto

- ✅ Login/logout com JWT
- ✅ Cadastro e listagem de produtos
- ✅ Exclusão de produtos com feedback visual
- ✅ Modal customizado com fundo escurecido

### 🔮 Funcionalidades futuras (em desenvolvimento):

- 🛒 Carrinho de compras
- 👤 Cadastramento de produto por usuário logado
- 🔎 Busca e filtro de produtos

---

## 🧠 Referências e Inspirações

- Todo Mundo Odeia o Chris
- Shopee, Mercado Livre, AliExpress
- Paródias como "Super-Herói: O Filme", "Super Velozes e Mega Furiosos"
- Propostas de sistemas completos em React + FastAPI

---

> _“No Mercado Preso, o preço é tão bom que você nem pergunta de onde veio.”_