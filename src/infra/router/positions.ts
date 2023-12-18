import { AddPositionUC, ChangePriceUC, PositionRenameUC } from '@/app';
import { AddPositionInput } from '@/app/usecase/position/add-position/types';
import { ChangeIngredientsUC } from '@/app/usecase/position/change-ingredients';
import { ChangeIngredientsInput } from '@/app/usecase/position/change-ingredients/types';
import { ChangePhotoUC } from '@/app/usecase/position/change-photo';
import { ChangePhotoInput } from '@/app/usecase/position/change-photo/types';
import { ChangePriceInput } from '@/app/usecase/position/change-price/types';
import { PositionRenameInput } from '@/app/usecase/position/position-rename/types';
import { Position, PositionProps, PositionRepo } from '@/domains';
import { Request, Response, Router } from 'express';

const positionsRouter = Router();

let positions: PositionProps[] = [
  {
    id:'asd',
    ingredients: [],
    name: 'asd',
    price: 23
  },
  {
    id:'ddd',
    ingredients: [],
    name: 'ddd',
    price: 22
  },
]

class A extends PositionRepo {
  async getByIDs(ids: string[]): Promise<Position[]> {
    const result: Position[] = [];

    ids.forEach((id) => {
      const props = positions.find((pos) => pos.id === id);
      if (props) result.push(new Position(props, this));
    });

    return result;
  }
  async removeByIDs(ids: string[]): Promise<void> {
    const updatedPosition = positions.filter((pos) => ids.includes(pos.id));
    positions = updatedPosition;
  }
  async add(entity: Position): Promise<Position> {
    positions.push(entity.props);
    return new Position(entity.props, this);
  }
  async patch(props: PositionProps): Promise<PositionProps> {
    const index = positions.findIndex((pos) => pos.id === props.id);

    positions[index] = props;

    return positions[index];
  }
}


positionsRouter.use((req, res, next) => {
  console.log(positions);
  next();
})
positionsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const repo = new A();

  const result = await repo.getByIDs([id]);

  res.send(result.map((el) => el.props));
});

positionsRouter.post('/', async (req: Request, res: Response) => {
  const addPositionUC = new AddPositionUC();
  const inputDTO = req.body as AddPositionInput;

  const result = await addPositionUC.execute(inputDTO, new A());

  res.send(result);
});

positionsRouter.patch('/:id/ingredients', async (req: Request, res: Response) => {
  const id = req.params.id;
  const uc = new ChangeIngredientsUC();
  const inputDTO = { ...req.body, id} as ChangeIngredientsInput;
  const result = await uc.execute(inputDTO, new A());
 
  res.send(result);
});

positionsRouter.patch('/:id/photo', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new ChangePhotoUC();
  const inputDTO = { ...req.body, id} as ChangePhotoInput;

  const result = await addPositionUC.execute(inputDTO, new A());

  res.send(result);
});

positionsRouter.patch('/:id/price', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new ChangePriceUC();
  const inputDTO = { ...req.body, id} as ChangePriceInput;

  const result = await addPositionUC.execute(inputDTO, new A());

  res.send(result);
});

positionsRouter.patch('/:id/rename', async (req: Request, res: Response) => {
  const id = req.params.id;
  const addPositionUC = new PositionRenameUC();
  const inputDTO = { ...req.body, id} as PositionRenameInput;

  const result = await addPositionUC.execute(inputDTO, new A());

  res.send(result);
});






export { positionsRouter };
