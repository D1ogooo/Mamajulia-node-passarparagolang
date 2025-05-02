import express from 'express'
import cors from 'cors'
const app = express()
import { initDB } from './configs/databaseConfig'
import { router } from './routes/routes'

app.use(cors())
app.use(express.json())
app.use(router)
initDB()

app.listen(3000, () => {
  console.log('Server rodando na porta 3000 ✔')
})