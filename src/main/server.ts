import { PgConnection } from '../infra/database/helpers/connection';
import { app } from './config/app';
import 'dotenv/config';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('./config/app');
    app.listen(process.env.PORT || 5050, () => {
      console.log('Server started at http://localhost:5050/api/docs');
    });
  });
