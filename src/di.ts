import { Express } from 'express';
import { createConnection } from 'typeorm';
import { Container } from 'inversify';
import { APPLICATION, DB_CONNECTION, USER_CONTROLLER } from './di-types';
import { UserController } from './controller/user-controller';

export const container = new Container();

//Declare dependencies to inject
export async function configureDI(app: Express) {
  const connection = await createConnection();
  container.bind(APPLICATION).toConstantValue(app);
  container.bind(DB_CONNECTION).toConstantValue(connection);
  container.bind(USER_CONTROLLER).to(UserController);
}

export function loadControllers() {
  container.get<UserController>(USER_CONTROLLER);
}