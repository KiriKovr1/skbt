import { Router } from 'express';
// import { test } from '../controllers/test.controller';
import categoryRouter from './category.router';

const apiRouter = Router();

apiRouter.use('/category', categoryRouter);
// apiRouter.get('/test', test);

export default apiRouter;
