import { Request, Router, Response } from 'express';
import { IngredientsControllers } from '../controllers';

const ingredientsControllers = new IngredientsControllers();

const router = Router();

router.get('/', (req: Request, res: Response) => ingredientsControllers.getSotckIngredients(req, res));

router.patch('/', (req: Request, res: Response) => ingredientsControllers.updateIngredients(req, res));

router.post('/', (req: Request, res: Response) => ingredientsControllers.registerIngredient(req, res));

router.patch('/:id', (req: Request, res: Response) => ingredientsControllers.editIngredient(req, res));

export default router;