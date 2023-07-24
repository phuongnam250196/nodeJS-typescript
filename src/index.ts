import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import '../ext/log'
import { ReadConfig } from './config'
import MysqlCommon from './../lib/mysqlDb'

import UserMysqlBase from './users/users.data'
import UserServiceBase from './users/users.business'
import NewUserAPI from './users/users.api'

async function main() {
  const config = await ReadConfig()
  const MysqlData = new MysqlCommon()
  const database = await MysqlData.Connect(config.database)

  const UserMongo = new UserMysqlBase(database)
  const UserService = new UserServiceBase(UserMongo)

  const app = express()
  app.disabled('x-powered-by')
  app.use(express.json())
  app.use(helmet())
  app.use(cors())

  app.use('/api/users', NewUserAPI(UserService))

  console.log(`Listening on ${config.server.port}`)
  app.listen(config.server.port, '0.0.0.0', () => {
    const err = arguments[0]
    if (err) {
      console.log(err)
    }
  })
}

main().catch((err) => console.log(err))
