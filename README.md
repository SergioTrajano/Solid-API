# <p align = "center"> API Solid </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-SergioTrajano-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/SergioTrajano/Design-System?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

API Rest de uma academia. É possível cadastrar usuários, fazer login, criar academias e fazer check-ins na academia.

---

## :computer: Tecnologias e Conceitos

-   Monorepo
-   API Rest
-   Fastify
-   TypeScript
-   JWT
-   Refresh Token
-   ORM
-   Testes E2E;

---

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Vite](https://vitejs.dev/guide/), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente. Alem disto, para subir o banco de dados esta aplicação faz uso do [Docker](https://www.docker.com/).

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/SergioTrajano/Solid-API
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Inicialize o banco de dados com

```
npm run initialize-db
```

Rode as migrations e inicie o prisma studio com

```
npm run initialize-prisma
```

Finalizado o processo, é só inicializar o servidor

```
npm run start:dev
```

Para rodar os testes unitários, faça:

```
npm run test
```

Para rodar os testes end-to-end, faça:

```
npm run test:e2e
```
