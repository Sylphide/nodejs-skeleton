
import * as express from 'express';
import { configureDI, loadControllers } from './di';

export async function server() {
  const app = express();
  const PORT = 3000;

  await configureDI(app);
  loadControllers();

  app.listen(PORT, () => {
      console.log('Express server listening on port ' + PORT);
  });
}