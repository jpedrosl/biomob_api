require('dotenv').config()
import { app } from "./app"
import { sequelize } from "./database"

const PORT = parseInt(process.env.PORT || "3000")

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso!')
    console.log('Modelos do Sequelize sincronizados com o banco de dados.')
  } catch (error) {
    console.error('Erro crítico ao conectar ou sincronizar com o banco de dados:', error)
    process.exit(1)
  }
  console.log(`O servidor foi iniciado com sucesso na porta ${PORT}`)
  console.log(`Acesse: http://localhost:${PORT}`)
})
