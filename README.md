[README_biomob_api.md](https://github.com/user-attachments/files/29272730/README_biomob_api.md)
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
- **JWT (JSON Web Token)** — autenticação e controle de acesso por papel (`role`)
- **Dados geoespaciais (GeoJSON)** — armazenamento de coordenadas e polígonos de área
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

### Autenticação e usuários
- `POST /auth/register` — Cadastro de usuário, com suporte a diferentes perfis de acesso (ex: `gestor`), data de nascimento, foto de perfil e status de verificação
- `[X]` — Login / autenticação (ex: `POST /auth/login`)
- Controle de acesso por papel (`role`) via autenticação JWT (Bearer Token)

### Hortas comunitárias (`/community-gardens`)
CRUD completo para gestão de hortas comunitárias, com suporte a dados geoespaciais:

- `POST /community-gardens` — Cria uma nova horta, incluindo localização (latitude/longitude), polígono geográfico da área (GeoJSON), tamanho da área (m²), status (`planned`, `active`, etc.) e responsável
- `GET /community-gardens` — Lista todas as hortas cadastradas
- `GET /community-gardens/:id` — Busca os detalhes de uma horta específica
- `PUT /community-gardens/:id` — Atualiza dados da horta (descrição, status, área, foto)
- `DELETE /community-gardens/:id` — Remove o cadastro de uma horta

### 🔜 Roadmap — Monitoramento de áreas (desmatamento e replantio)
> _[Esta seção cobre os módulos de monitoramento de desmatamento e replantio — complete com os endpoints reais quando estiverem implementados/confirmados]_

- `[X]` — Cadastro e consulta de áreas de desmatamento e replantio
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
