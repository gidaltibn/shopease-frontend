Com base na estrutura de pastas que você forneceu, vou ajustar o **README** para refletir corretamente o seu projeto **Shopease-Frontend**. Veja como fica:

---

# Shopease Frontend

**Shopease Frontend** é a interface do usuário para a aplicação **Shopease**, uma loja virtual que permite aos usuários navegar por produtos, adicionar itens ao carrinho e realizar compras. A aplicação foi construída com **React.js** e se comunica com o backend do **Shopease**, que consome a **FakeStore API** para buscar produtos.

## Funcionalidades

- **Autenticação de Usuários**: Login e cadastro de novos usuários.
- **Listagem de Produtos**: Exibe uma lista de produtos, cujos dados são consumidos a partir do backend.
- **Carrinho de Compras**: Permite adicionar, remover e atualizar a quantidade de produtos no carrinho.
- **Finalização de Compras**: Permite a finalização de pedidos, que são enviados para o backend.
- **Histórico de Pedidos**: Exibe o histórico de compras do usuário, permitindo repetir uma compra anterior.

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção da interface de usuário.
- **Axios**: Biblioteca para realizar requisições HTTP ao backend.
- **React Router**: Gerenciamento de rotas para navegação entre as páginas da aplicação.
- **FontAwesome**: Utilizado para ícones na interface.
- **Docker**: Para conteinerização da aplicação.

## Pré-requisitos

Antes de começar, certifique-se de que você tem o [Docker](https://www.docker.com/get-started) instalado na sua máquina.

## Como Rodar o Projeto

### Rodando com Docker

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/shopease-frontend.git
   cd shopease-frontend
   ```

2. **Construa a imagem Docker**:

   ```bash
   docker build -t shopease-frontend .
   ```

3. **Execute o container**:

   ```bash
   docker run -p 3000:80 shopease-frontend
   ```

4. **Acesse a aplicação**:

   A aplicação estará disponível em `http://localhost:3000`.

### Rodando Localmente (sem Docker)

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/shopease-frontend.git
   cd shopease-frontend
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie a aplicação**:

   ```bash
   npm start
   ```

4. **Acesse a aplicação**:

   A aplicação estará disponível em `http://localhost:3000`.

## Rotas da Aplicação

- **/login** - Página de login para autenticação de usuários.
- **/signup** - Página de cadastro de novos usuários.
- **/products** - Página principal que exibe a lista de produtos.
- **/products/:id** - Página de detalhes do produto, onde o usuário pode visualizar informações detalhadas e adicionar ao carrinho.
- **/cart** - Página do carrinho de compras, onde os produtos são exibidos e o usuário pode finalizar a compra.
- **/checkout** - Página de finalização de compra.
- **/orders** - Página que exibe o histórico de compras do usuário.

## Estrutura do Projeto

```bash
shopease-frontend/
│
├── public/                      # Arquivos públicos como favicon e index.html
├── src/
│   ├── assets/                  # Arquivos estáticos como imagens e estilos
│   ├── components/              # Componentes reutilizáveis
│   │   ├── CategoryMenu/         # Menu de categorias
│   │   ├── NavBar/               # Barra de navegação
│   │   └── ProductCard/          # Card de produto
│   ├── pages/                   # Páginas principais da aplicação
│   │   ├── Cart/                # Página de carrinho
│   │   ├── Checkout/            # Página de checkout
│   │   ├── Login/               # Página de login
│   │   ├── Orders/              # Página de pedidos
│   │   ├── ProductDetail/       # Página de detalhes do produto
│   │   ├── Products/            # Página de listagem de produtos
│   │   └── SignUp/              # Página de cadastro
│   ├── services/                # Serviços para comunicação com o backend
│   ├── App.js                   # Configuração das rotas
│   ├── index.js                 # Ponto de entrada da aplicação
│   ├── Dockerfile               # Arquivo para configurar a construção do container Docker
│   └── docker-compose.yml       # Arquivo Docker Compose para orquestração dos containers
├── package.json                 # Dependências e scripts do projeto
└── README.md                    # Documentação do projeto
```

## Comunicação com o Backend

O frontend do **Shopease** realiza chamadas HTTP para o backend utilizando a biblioteca **Axios**. Aqui estão alguns dos fluxos principais de comunicação:

1. **Autenticação de Usuários**:
   - O login e o cadastro de usuários são gerenciados através de chamadas ao backend, que gera tokens JWT para autenticação.

2. **Listagem de Produtos**:
   - Os produtos são obtidos a partir do backend, que consome os dados da **FakeStore API**.

3. **Carrinho de Compras**:
   - Os produtos adicionados ao carrinho são enviados ao backend, que gerencia o estado do carrinho.

4. **Finalização de Compras**:
   - A finalização do pedido é tratada no backend, que cria uma nova entrada no histórico de pedidos do usuário.

5. **Histórico de Compras**:
   - O histórico de compras é solicitado ao backend, que retorna os pedidos do usuário logado.