export default class UserServiceBase {
  UserMysql?: any
  constructor(UserMysql: any) {
    this.UserMysql = UserMysql
  }

  async listUser() {
    const doc = await this.UserMysql.listUser()
    return doc
  }
}
