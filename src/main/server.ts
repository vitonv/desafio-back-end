import { PgConnection } from '../infra/database/helpers/connection';
import { app } from './config/app';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('./config/app');
    app.listen(5050, () => {
      console.log('Server started at port 5050!');
    });
  });
