# Trybe Futebol Clube

## Descrição do Projeto
O **Trybe Futebol Clube** é uma aplicação web full stack que utiliza o framework **Node.js** e a biblioteca **Sequelize** para construir um back-end robusto e dockerizado. Este projeto também inclui um front-end integrado para consumir a API desenvolvida. O objetivo é criar uma plataforma para gerenciar times de futebol, partidas e classificações, utilizando boas práticas de desenvolvimento como TDD (Test-Driven Development) e princípios SOLID.

## Tecnologias Utilizadas

### Back-end
- **Node.js**
- **Express.js**
- **Sequelize** (ORM para modelagem de dados)
- **Docker** e **Docker Compose**
- **MySQL**
- **Mocha**, **Chai** e **Sinon** (para testes)

### Front-end
- **React.js**
- **CSS**

### Ferramentas Adicionais
- **ESLint** e **Prettier** (para linting e formatação de código)
- **Dotenv** (para configurações de variáveis de ambiente)
- **NyC** (para cobertura de testes)

### Funcionalidades Principais
1. Criar migrations e models para as tabelas:
   - Times
   - Usuários
   - Partidas
2. Desenvolver endpoints para:
   - Gerenciamento de times (/teams e /teams/:id)
   - Login de usuários (/login e /login/role)
   - Gerenciamento de partidas (/matches, /matches/:id e /matches/:id/finish)
   - Classificação de times (/leaderboard/home)
3. Implementar middleware de autenticação por token JWT.

## Configuração do Ambiente
Para configurar o projeto, siga os passos abaixo:

### Dependências
- Node.js na versão 16.14.0 LTS
- Docker Compose na versão ^1.29.2

### Inicialização do Projeto
1. Clone o repositório:
   ```bash
    git clone https://github.com/vicentevendramin/trybe-futebol-clube.git
    cd trybe-futebol-clube
    ```
2. Inicie os containers Docker:
   ```bash
    docker-compose up -d
    ```
3. Para reconstruir os containers:
   ```bash
    docker-compose up --build
    ```

## Estrutura do Projeto

### Backend
```
app/backend
├── src
   ├── controllers
   ├── database
   ├── interfaces
   ├── middlewares
   ├── routes
   ├── services
   ├── tests
   └── utils
├── app.ts
└── server.ts
```

### Frontend
```
app/frontend
├── public
├── src
   ├── components
   ├── images
   ├── pages
   ├── services
   ├── styles
   └── App.js
```

### Arquivos de Configuração
- `.env.example`: Exemplo de variáveis de ambiente.
- `docker-compose.yml`: Configuração de containers.
- `Dockerfile`: Configuração de imagens Docker para front-end e back-end.

## Comandos Principais

### Backend
- Rodar a aplicação:
  ```bash
  npm start
  ```
- Executar os testes:
  ```bash
  npm test
  ```
- Resetar banco de dados:
  ```bash
  npm run db:reset
  ```

### Frontend
- Rodar a aplicação:
  ```bash
  npm start
  ```