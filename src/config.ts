import dotenv from 'dotenv'
import path from 'path'

const PORT: number = parseInt((process.env.PORT as string) || '3000', 10)

export async function ReadConfig() {
  dotenv.config()
  const resolvedir = (dir: any) => (dir ? path.resolve(process.cwd(), dir) : undefined)
  const config = {
    server: {
      port: PORT
    },
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    app: {
      dir: resolvedir('../frontend')
    }
  }
  Object.defineProperty(config.database, 'db_url', {
    enumerable: false
  })
  return config
}
