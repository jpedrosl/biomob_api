import { app } from "./app"
import { sequelize } from "./database"

const PORT = parseInt(process.env.PORT || "3000")

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!')
  })
 
  console.log(`O servidor foi iniciado com sucesso! na porta ${PORT}`)
})
