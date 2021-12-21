import cors from 'cors';
import express from 'express';

import { routes } from '../routes';
import setupSwagger from './swagger-config';

const app = express();
app.use(cors());
setupSwagger(app);
app.use(express.json());
app.use('/api', routes);
export { app };
