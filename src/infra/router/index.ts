import { Router } from 'express';
import { categoriesRouter } from './categories';
import { positionsRouter } from './positions';

const router = Router();

router.get('/', (req, res)=> {
  res.send('aaaa');
})
router.use('/categories', categoriesRouter);
router.use('/positions', positionsRouter);

export { router };
