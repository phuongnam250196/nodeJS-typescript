import express from 'express'

export default function NewUserAPI(UserService: any) {
  const app = express()
  app.use(express.json())

  app.get('/', async (req, res) => {
    const doc = await UserService.listUser()
    res.json(doc)
  })

  return app
}
