import { ModelStatic } from 'sequelize';
import IUsers from '../Interfaces/Users';
import UsersModel from '../database/models/UsersModel';

class UsersService {
  constructor(
    private usersModel: ModelStatic<UsersModel>,
  ) { }

  async login(email: string): Promise<IUsers> {
    return this.usersModel.findOne({
      where: { email },
    }) as unknown as IUsers;
  }
}

export default UsersService;
