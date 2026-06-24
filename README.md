[README_biomob_api.md](https://github.com/user-attachments/files/29272647/README_biomob_api.md)
# Biomob API

API REST desenvolvida para o projeto **Biomob**, uma plataforma de monitoramento geográfico voltada para o acompanhamento de áreas de desmatamento, replantio e hortas comunitárias. Projeto desenvolvido durante o programa **Serratec** (Parque Tecnológico da Região Serrana, RJ).

## 🎯 Sobre o projeto

Esta API serve como backend para o [portal de monitoramento Biomob](https://github.com/jpedrosl/biomob-reflorestamento), fornecendo os dados geográficos e operacionais consumidos pela interface web.

Atuei como responsável técnico pelo desenvolvimento do backend, incluindo arquitetura da API, modelagem de dados e integração com banco de dados.

## 🛠️ Tecnologias utilizadas

- **Node.js** — ambiente de execução
- **TypeScript** — tipagem estática e organização do código
- **Express** — framework HTTP para definição de rotas e middlewares
- **PostgreSQL** — banco de dados relacional
- **Sequelize** — ORM para modelagem e consultas ao banco de dados
- **Vercel** — plataforma de deploy

## 📁 Estrutura do projeto

```
biomob_api/
├── api/          # Camada de entrada da aplicação
├── config/       # Configurações (banco de dados, ambiente)
├── endpoints/    # Definição das rotas da API
├── src/          # Lógica principal (controllers, models, services)
├── .env.example  # Exemplo de variáveis de ambiente necessárias
└── vercel.json   # Configuração de deploy na Vercel
```

## 📌 Principais recursos da API

> _[Complete esta seção com os recursos reais — ex: cadastro de áreas monitoradas, registro de plantios, usuários, relatórios de desmatamento, etc.]_

- `[X]` — Gestão de áreas monitoradas (desmatamento, replantio, hortas comunitárias)
- `[X]` — Cadastro e consulta de dados geográficos
- `[X]` — Autenticação de usuários
- `[X]` — Geração de relatórios/indicadores

## 🚀 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/jpedrosl/biomob_api.git
   cd biomob_api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # edite o .env com suas credenciais de banco de dados
   ```

4. Execute as migrações do banco (Sequelize):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 👤 Autor

**João Pedro Souza de Lima**
[LinkedIn](https://www.linkedin.com/in/jpedrosl) · jpedrosl42@gmail.com
