import { AddPositionUC, ChangePriceUC, PositionRenameUC } from '@/app';
import { AddPositionInput } from '@/app/usecase/position/add-position/types';
import { ChangeIngredientsUC } from '@/app/usecase/position/change-ingredients';
import { ChangeIngredientsInput } from '@/app/usecase/position/change-ingredients/types';
import { ChangePhotoUC } from '@/app/usecase/position/change-photo';
import { ChangePhotoInput } from '@/app/usecase/position/change-photo/types';
import { ChangePriceInput } from '@/app/usecase/position/change-price/types';
import { PositionRenameInput } from '@/app/usecase/position/position-rename/types';
import { Request, Response, Router } from 'express';
import { PositionStorage } from '../repo/position.storage';

const positionsRouter = Router();


positionsRouter.get('/', async (req: Request, res: Response) => {
  const repo = new PositionStorage();

  const result = await repo.all();

  res.send(result.map((el) => el.props));
});

positionsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const repo = new PositionStorage();

  const result = (await repo.getByIDs([id]))[0];

  res.send(result.props);
});

positionsRouter.post('/', async (req: Request, res: Response) => {
  const addPositionUC = new AddPositionUC();
  const inputDTO = req.body as AddPositionInput;

  const result = await addPositionUC.execute(inputDTO, new PositionStorage());

  res.send(result);
});

positionsRouter.patch('/:id/ingredients', async (req: Request, res: Response) => {
  const id = req.params.id;
  const uc = new ChangeIngredientsUC();
  const inputDTO = { ...req.body, id} as ChangeIngredientsInput;
  const result = await uc.execute(inputDTO, new PositionStorage());
 
  res.send(result);
});

positionsRouter.patch('/:id/photo', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new ChangePhotoUC();
  const inputDTO = { ...req.body, id} as ChangePhotoInput;

  const result = await addPositionUC.execute(inputDTO, new PositionStorage());

  res.send(result);
});

positionsRouter.patch('/:id/price', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new ChangePriceUC();
  const inputDTO = { ...req.body, id} as ChangePriceInput;

  const result = await addPositionUC.execute(inputDTO, new PositionStorage());

  res.send(result);
});

positionsRouter.patch('/:id/rename', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new PositionRenameUC();
  const inputDTO = { ...req.body, id} as PositionRenameInput;

  const result = await addPositionUC.execute(inputDTO, new PositionStorage());

  res.send(result);
});






export { positionsRouter };
