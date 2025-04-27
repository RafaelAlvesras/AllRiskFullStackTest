#  API de Previsão do Tempo

API RESTful desenvolvida com .NET 8 para buscar, salvar e listar previsões do tempo integrando com a OpenWeatherMap.

## Autenticação
- Login e cadastro de usuários reais com hash de senha
- JWT usado para proteger rotas e associar dados ao usuário autenticado

## Endpoints principais

### `POST /api/auth/register`
Cadastra um novo usuário

### `POST /api/auth/login`
Autentica usuário e retorna JWT

### `POST /api/cidadesfavoritas` 
Adiciona uma cidade aos favoritos do usuário logado

### `GET /api/cidadesfavoritas` 
Lista apenas as cidades do usuário logado

### `DELETE /api/cidadesfavoritas/{id}` 
Remove uma cidade do usuário logado

## Testes com Postman
- Envie o token JWT no header `Authorization: Bearer {seu_token}`

## Tecnologias
- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- JWT
