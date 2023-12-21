import { Router } from 'express';
import { categoriesRouter } from './categories';
import { positionsRouter } from './positions';
import { userRouter } from './user';

const router = Router();

router.use('/user', userRouter);
router.use('/categories', categoriesRouter);
router.use('/positions', positionsRouter);

export { router };
