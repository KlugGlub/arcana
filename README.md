# Arcana

Projeto web desenvolvido com **React + TypeScript + Vite** no frontend e **Python + FastAPI** no backend.  
O sistema utiliza **MySQL via XAMPP** para cadastro, login e leituras relacionadas aos Arcanos.

---

## Sumário

- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do banco de dados](#configuração-do-banco-de-dados)
- [Configuração do backend](#configuração-do-backend)
- [Configuração do frontend](#configuração-do-frontend)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Acessos principais](#acessos-principais)
- [Debug do backend](#debug-do-backend)
- [Problemas comuns](#problemas-comuns)

---

## Estrutura do projeto

O `package.json` fica na raiz do projeto e é responsável por iniciar o frontend e o backend.

---

## Pré-requisitos

Antes de iniciar, certifique-se de já ter as ferramentas necessárias instaladas na máquina:

- Python
- Node.js e npm
- XAMPP
- Git
- VS Code ou outro editor de código

Este README não cobre a instalação dessas ferramentas.

---

## Configuração do banco de dados

### 1. Inicializar o XAMPP

1. Abra o **XAMPP Control Panel**.
3. Inicie o serviço **MySQL**.
4. Acesse o phpMyAdmin pelo navegador:

```text
http://localhost/phpmyadmin
```

---

### 2. Criar o banco de dados

No phpMyAdmin:

1. Clique em **Novo**.
2. Crie um banco de dados para o projeto, por exemplo:

```text
arcana
```

3. Selecione o banco criado.
4. Vá até a aba **Importar**.
5. Selecione o arquivo SQL com a estrutura do banco:

```text
.\backend\database\estrutura_db.sql
```

6. Clique em **Executar**.

Esse script deve criar as tabelas necessárias para o funcionamento do projeto, como usuários, cartas e leituras.

7. Após isso, faça o mesmo com o arquivo de população da tabela de cartas:

```text
.\backend\database\inserts_tarot.sql
```

---

### 3. Conferir conexão com o banco

No backend, confira o arquivo responsável pela conexão com o MySQL.

A configuração normalmente deve estar parecida com:

```python
HOST = "localhost"
DB_NAME = "db_arcana"
USER = "root"
PASSWORD = ""
```

Caso seu MySQL tenha senha, ajuste o campo `password`.

Exemplo:

```python
password = "sua_senha"
```

---

## Configuração do backend

### 1. Criar o ambiente virtual

Na raiz do projeto, execute:

```bash
python -m venv .venv
```

---

### 2. Ativar o ambiente virtual

No Windows:

```bash
.venv\Scripts\activate
```

Se ativado corretamente, o terminal deve exibir algo como:

```text
(.venv)
```

---

### 3. Instalar dependências Python

Com o ambiente virtual ativo, execute:

```bash
.venv\Scripts\python.exe -m pip install -r requisites.txt
```

Principais dependências esperadas no backend:

```text
fastapi
uvicorn
bcrypt
mysql-connector-python
pydantic
```

---

## Configuração do frontend

Na raiz do projeto, instale as dependências Node:

```bash
npm install
```

Esse comando instala as dependências do frontend, incluindo React, Vite, Tailwind, shadcn/ui e bibliotecas auxiliares.

---

## Como rodar o projeto

Com o XAMPP aberto, Apache/MySQL iniciados, banco importado e dependências instaladas, execute na raiz do projeto:

```bash
npm run dev
```

Esse comando inicia o frontend e o backend ao mesmo tempo.

A configuração esperada no `package.json` é semelhante a esta:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:front\" \"npm run dev:back\"",
    "dev:front": "cd frontend && ..\\node_modules\\.bin\\vite --host localhost --port 8080",
    "dev:back": "cd backend && ..\\.venv\\Scripts\\python.exe -m uvicorn main:app --reload --host localhost --port 8000",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## Acessos principais

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:8000
```

Documentação automática da API:

```text
http://localhost:8000/docs
```

---

## Testando a API pelo Swagger

Para testar as rotas manualmente:

1. Acesse:

```text
http://localhost:8000/docs
```

2. Escolha uma rota, por exemplo:

```text
POST /api/cadastro
POST /api/login
POST /api/compatibilidade
```

3. Clique em **Try it out**.
4. Preencha o JSON solicitado.
5. Clique em **Execute**.

---

## Comandos úteis

Rodar o projeto completo:

```bash
npm run dev
```

Rodar apenas o frontend:

```bash
npm run dev:front
```

Rodar apenas o backend:

```bash
npm run dev:back
```

Parar os servidores:

```bash
Ctrl + C
```

---

## Debug do backend

Para debugar o backend no VS Code, recomenda-se rodar apenas o frontend pelo terminal:

```bash
npm run dev:front
```

Depois, crie ou ajuste o arquivo:

```text
.vscode/launch.json
```

Com a seguinte configuração:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug FastAPI Backend",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": [
        "main:app",
        "--host",
        "localhost",
        "--port",
        "8000"
      ],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal",
      "justMyCode": true
    }
  ]
}
```

Depois:

1. Abra algum arquivo do backend, como `backend/main.py`.
2. Coloque um breakpoint na rota desejada.
3. Vá em **Run and Debug**.
4. Selecione **Debug FastAPI Backend**.
5. Pressione `F5`.

---



## Fluxo recomendado para rodar do zero

1. Abrir o XAMPP.
2. Iniciar **Apache** e **MySQL**.
3. Criar o banco no phpMyAdmin.
4. Importar o script SQL da estrutura do banco.
5. Criar e ativar o ambiente virtual Python.
6. Instalar dependências Python:

```bash
.venv\Scripts\python.exe -m pip install -r requisites.txt
```

7. Instalar dependências Node:

```bash
npm install
```

8. Rodar o projeto:

```bash
npm run dev
```

9. Abrir no navegador:

```text
http://localhost:8080
```

---

## Observações

- O frontend roda na porta `8080`.
- O backend roda na porta `8000`.
- O banco de dados deve estar ativo antes de usar cadastro, login ou leituras.
- A documentação da API fica disponível em `/docs`.
