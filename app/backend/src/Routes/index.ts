import { Router } from 'express';
import ingredientsRouter from './ingredients.routes'

const router = Router();

router.use('/ingredients', ingredientsRouter);

export default router;