import { AddCategoryUC, AddPositionToCategoryUC, ChangeDescriptionCategoryUC, RemovePositionFromCategoryUC, RenameCategoryUC } from '@/app/usecase/category';
import { AddCategoryInput } from '@/app/usecase/category/add-category/types';
import { AddPositionToCategoryInput } from '@/app/usecase/category/add-position-to-category/types';
import { ChangeDescriptionCategoryInput } from '@/app/usecase/category/change-description/types';
import { RemovePositionFromCategoryInput } from '@/app/usecase/category/remove-position-from-category/types';
import { RenameCategoryInput } from '@/app/usecase/category/rename-category/types';
import { Category, CategoryProps, CategoryRepo, Position, PositionProps, PositionRepo } from '@/domains';
import { Request, Response, Router } from 'express';

const categoriesRouter = Router();



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

class PosRepo extends PositionRepo {
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


let categories: CategoryProps[] = [
  {
    id:'asd',
    name: 'asd',
    positions: [],
    description: 'adadsad'
  },
  {
    id:'ddd',
    name: 'ddd',
    positions: [],
  },
]

class A extends CategoryRepo {
  async getByIDs(ids: string[]): Promise<Category[]> {
    const result: Category[] = [];

    ids.forEach((id) => {
      const props = categories.find((pos) => pos.id === id);
      if (props) result.push(new Category(props, this));
    });

    return result;
  }
  async removeByIDs(ids: string[]): Promise<void> {
    const updatedPosition = categories.filter((cat) => ids.includes(cat.id));
    categories = updatedPosition;
  }
  async add(entity: Category): Promise<Category> {
    categories.push(entity.props);
    return new Category(entity.props, this);
  }
  async patch(props: CategoryProps): Promise<CategoryProps> {
    const index = categories.findIndex((cat) => cat.id === props.id);

    categories[index] = props;

    return categories[index];
  }
}


categoriesRouter.use((req, res, next) => {
  console.log("categories", categories);
  console.log("positions", positions);
  next();
})

categoriesRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const repo = new A();

  const result = await repo.getByIDs([id]);

  res.send(result[0].props);
});

categoriesRouter.post('/', async (req: Request, res: Response) => {
  const inputDTO = req.body as AddCategoryInput;
  const uc = new AddCategoryUC();

  const result = uc.execute(inputDTO, new A());

  res.send(result);
});

categoriesRouter.patch('/:id/description', async (req: Request, res: Response) => {
  const id = req.params.id;
  const inputDTO = { ...req.body, id} as ChangeDescriptionCategoryInput;
  const uc = new ChangeDescriptionCategoryUC();

  const result = await uc.execute(inputDTO, new A());
  
  res.send(result);
});

categoriesRouter.patch('/:id/rename', async (req: Request, res: Response) => {
  const id = req.params.id;
  const inputDTO = { ...req.body, id} as RenameCategoryInput;
  const uc = new RenameCategoryUC();

  const result = await uc.execute(inputDTO, new A());
  
  res.send(result);
});

categoriesRouter.post('/:categoryID/positions', async (req: Request, res: Response) => {
  const targetCategoryID = req.params.categoryID;
  const inputDTO = { positionDTO: req.body, targetCategoryID } as AddPositionToCategoryInput;
  const uc = new AddPositionToCategoryUC();

  const result = await uc.execute(inputDTO, new A(), new PosRepo());
  
  res.send(result);
});

categoriesRouter.delete('/:targetCategoryID/positions/:positionID', async (req: Request, res: Response) => {
  const { targetCategoryID, positionID } = req.params;
  const inputDTO = { targetCategoryID, positionID } as RemovePositionFromCategoryInput;
  const uc = new RemovePositionFromCategoryUC();

  const result = await uc.execute(inputDTO, new A());
  
  res.send(result);
});

export { categoriesRouter };
