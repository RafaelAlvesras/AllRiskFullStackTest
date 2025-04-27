# 🌤️ Previsão do Tempo - Fullstack Application

Aplicação Fullstack para busca e gerenciamento de previsões do tempo, com cadastro de usuários, favoritos e autenticação JWT.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend (React.js + Vite)

- React.js
- Vite
- React Router DOM
- React Toastify
- React Icons
- CSS Modules

### 🔹 Backend (ASP.NET Core 8)

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- OpenWeatherMap API

---

## 📚 Funcionalidades

### 👤 Usuário
- Cadastro de usuário
- Login com JWT
- Logout seguro

### 🌦️ Clima
- Buscar previsão do tempo por cidade (temperatura atual, condição, máxima, mínima e umidade)
- Exibir ícone da condição climática

### ⭐ Favoritos
- Adicionar cidades aos favoritos
- Remover cidades dos favoritos
- Ver lista de cidades favoritas atualizada

### 🎨 Extras
- Layout responsivo (desktop e mobile)
- Toasts de sucesso e erro
- Interface moderna e organizada

---

## 📦 Como rodar o projeto localmente

### 🔹 Pré-requisitos
- Node.js instalado
- .NET 8 instalado
- SQL Server instalado
- Conta gratuita na [OpenWeatherMap](https://openweathermap.org/) (pegar API Key)

---

### 🔹 Clonando o repositório

```bash
git clone https://github.com/seu-usuario/AllRiskFullStackTestgit
cd seu-repositorio
```

---

### 🔹 Rodando o Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

> O backend estará rodando em: **https://localhost:5235**

---

### 🔹 Rodando o Frontend

```bash
cd frontend
npm install
npm run dev
```

> O frontend estará rodando em: **http://localhost:5173**

---

## 🔐 Variáveis de ambiente

No **backend** (`appsettings.json`):

```json
"OpenWeather": {
  "ApiKey": "SUA_API_KEY"
}
```

No **frontend** (se quiser usar `.env` - **opcional**).

---

## 🖼️ Telas do Projeto

- Página de Login
- Página de Cadastro
- Tela principal com busca de clima
- Tela de cidades favoritas
- Header responsivo

---

## 🛡️ Observações

- Todas as rotas protegidas exigem autenticação JWT.
- Tokens são armazenados no `localStorage`.
- Segurança reforçada via **CORS** no backend.

---
