import {
  AddCategoryUC,
  AddPositionToCategoryUC,
  ChangeDescriptionCategoryUC,
  RemovePositionFromCategoryUC,
  RenameCategoryUC
} from '@/app/usecase/category';
import { AddCategoryInput } from '@/app/usecase/category/add-category/types';
import { AddPositionToCategoryInput } from '@/app/usecase/category/add-position-to-category/types';
import { ChangeDescriptionCategoryInput } from '@/app/usecase/category/change-description/types';
import { RemovePositionFromCategoryInput } from '@/app/usecase/category/remove-position-from-category/types';
import { RenameCategoryInput } from '@/app/usecase/category/rename-category/types';
import { Request, Response, Router } from 'express';
import { CategoryStorage } from '../repo';
import { PositionStorage } from '../repo/position.storage';

const categoriesRouter = Router();

categoriesRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const repo = new CategoryStorage();

  const result = await repo.getByIDs([id]);

  res.send(result[0].props);
});

categoriesRouter.post('/', async (req: Request, res: Response) => {
  const inputDTO = req.body as AddCategoryInput;
  const uc = new AddCategoryUC();

  const result = uc.execute(inputDTO, new CategoryStorage());

  res.send(result);
});

categoriesRouter.patch('/:id/description', async (req: Request, res: Response) => {
  const id = req.params.id;
  const inputDTO = { ...req.body, id} as ChangeDescriptionCategoryInput;
  const uc = new ChangeDescriptionCategoryUC();

  const result = await uc.execute(inputDTO, new CategoryStorage());
  
  res.send(result);
});

categoriesRouter.patch('/:id/rename', async (req: Request, res: Response) => {
  const id = req.params.id;
  const inputDTO = { ...req.body, id} as RenameCategoryInput;
  const uc = new RenameCategoryUC();

  const result = await uc.execute(inputDTO, new CategoryStorage());
  
  res.send(result);
});

categoriesRouter.post('/:categoryID/positions', async (req: Request, res: Response) => {
  const targetCategoryID = req.params.categoryID;
  const inputDTO = { positionDTO: req.body, targetCategoryID } as AddPositionToCategoryInput;
  const uc = new AddPositionToCategoryUC();

  const result = await uc.execute(inputDTO, new CategoryStorage(), new PositionStorage());
  
  res.send(result);
});

categoriesRouter.delete('/:targetCategoryID/positions/:positionID', async (req: Request, res: Response) => {
  const { targetCategoryID, positionID } = req.params;
  const inputDTO = { targetCategoryID, positionID } as RemovePositionFromCategoryInput;
  const uc = new RemovePositionFromCategoryUC();

  const result = await uc.execute(inputDTO, new CategoryStorage());
  
  res.send(result);
});

export { categoriesRouter };
