import dotenv from 'dotenv';
import mongoose from 'mongoose'
dotenv.config();

async function initDB() {
  try {
    const DBUSER = process.env.USERNAME_DB;
    const DBPASSWORD = process.env.PASSWORD_DB;

    if (!DBUSER || !DBPASSWORD) {
      console.log(`${DBUSER} ${DBPASSWORD}`)
      throw new Error('Credenciais do banco de dados não encontradas.');
    }

    await mongoose.connect(
      `mongodb+srv://${DBUSER}:${DBPASSWORD}@mamajuliacloud.rkhb3ih.mongodb.net/?retryWrites=true&w=majority&appName=MamajuliaCloud`
    );
    console.log('Conecado ao MongoDB ✔');
  } catch (error) {
    console.error('ERROR: falha ao conectar com o MongoDB', error);
  }
}

export { initDB }