export default class MysqlCommon {
  db?: any
  obj?: any
  arr?: any
  constructor(db?: any, obj?: any, arr?: any) {
    this.db = db
    this.obj = obj
    this.arr = arr
  }

  async Connect(db: any) {
    const mysqlClient = require('mysql')
    const connection = mysqlClient.createConnection(db)

    await connection.connect()
    return connection
  }

  One(obj: any) {
    if (!obj) {
      return null
    }
    const key_value = Object.entries(obj)
    const newObj = key_value.map((k) => {
      if (k[0] == '_id') {
        k[0] = 'id'
      }
      return k
    })
    return Object.fromEntries(newObj)
  }

  Many(arr: any) {
    if (!arr) {
      return []
    }
    const newArr = arr.map((el: any) => this.One(el))
    return newArr
  }

  ToMongo(obj: any) {
    if (!obj) {
      return null
    }
    const key_value = Object.entries(obj)
    const newObj = key_value.map((k) => {
      if (k[0] == 'id') {
        k[0] = '_id'
      }
      return k
    })
    return Object.fromEntries(newObj)
  }
}
