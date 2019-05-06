import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Connection, Repository } from 'typeorm';
import { Express } from 'express';
import { User } from '../entities/user';
import { DB_CONNECTION, APPLICATION } from '../di-types';

@injectable()
export class UserController {

  private userRepository: Repository<User>;

  constructor(
    @inject(DB_CONNECTION) connection: Connection,
    @inject(APPLICATION) app: Express
  ) {
    this.userRepository = connection.getRepository(User);
    app.get('/users', this.getUsers.bind(this));
  }

  async getUsers(req: Request, res: Response) {
    res.json(await this.userRepository.find());
  }
}