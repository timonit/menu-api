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
import { checkToken } from './utils';

const categoriesRouter = Router();


categoriesRouter.get('/', checkToken, async (req: Request, res: Response, next) => {
  try {
    const repo = new CategoryStorage();
  
    const result = await repo.all();
  
    res.send(result.map((el) => el.props));
  } catch(err) {next(err)}
});

categoriesRouter.get('/:id', async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const categoryRepo = new CategoryStorage();
    const positionRepo = new PositionStorage();
  
    const category = (await categoryRepo.getByIDs([id]))[0];
    const positions = (await positionRepo.getByIDs(category.getProp('positions')));
  
    res.send({...category.props, positions: positions.map(pos => pos.props)});
  } catch(err) {next(err)}
});

categoriesRouter.post('/', async (req: Request, res: Response, next) => {
  try {
    const inputDTO = req.body as AddCategoryInput;
    const uc = new AddCategoryUC();
  
    const result = await uc.execute(inputDTO, new CategoryStorage());
  
    res.send(result);
  } catch(err) {next(err)}
});


categoriesRouter.delete('/:id', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const categoryRepo = new CategoryStorage();
    await categoryRepo.removeByIDs([id]);
    
    res.send(id);
  } catch(err) {next(err)}
});

categoriesRouter.patch('/:id/description', async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const inputDTO = { ...req.body, id} as ChangeDescriptionCategoryInput;
    const uc = new ChangeDescriptionCategoryUC();
  
    const result = await uc.execute(inputDTO, new CategoryStorage());
    
    res.send(result);
  } catch(err) {next(err)}
});

categoriesRouter.patch('/:id/rename', async (req: Request, res: Response, next) => {
  try {
    const id = req.params.id;
    const inputDTO = { ...req.body, id} as RenameCategoryInput;
    const uc = new RenameCategoryUC();
  
    const result = await uc.execute(inputDTO, new CategoryStorage());
    
    res.send(result);
  } catch(err) {next(err)}
});

categoriesRouter.post('/:categoryID/positions', async (req: Request, res: Response, next) => {
  try {
    const targetCategoryID = req.params.categoryID;
    const inputDTO = { positionDTO: req.body, targetCategoryID } as AddPositionToCategoryInput;
    const uc = new AddPositionToCategoryUC();
    console.log(inputDTO)
    const result = await uc.execute(inputDTO, new CategoryStorage(), new PositionStorage());
    
    res.send(result);
  } catch(err) {next(err)}
});

categoriesRouter.delete('/:targetCategoryID/positions/:positionID', async (req: Request, res: Response, next) => {
  try {
    const { targetCategoryID, positionID } = req.params;
    const inputDTO = { targetCategoryID, positionID } as RemovePositionFromCategoryInput;
    const uc = new RemovePositionFromCategoryUC();
  
    const result = await uc.execute(inputDTO, new CategoryStorage());
    
    res.send(result);
  } catch(err) {next(err)}
});

export { categoriesRouter };
