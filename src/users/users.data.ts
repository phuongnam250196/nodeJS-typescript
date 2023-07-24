const util = require('util')

export default class UserMysqlBase {
  db?: any
  query?: any
  constructor(db: any) {
    this.db = db
    this.query = util.promisify(this.db.query).bind(this.db)
  }

  async listUser() {
    const sql = 'select * from users'
    const rows = await this.query(sql)
    return rows
  }
}
