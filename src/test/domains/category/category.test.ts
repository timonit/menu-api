import { Category, CategoryProps, Position } from '@/domains';
import { CategoryRepo } from '@/domains/entities/category/category.repo';
import { NameIsEmptyError } from '@/domains/entities/category/error';

describe('category', () => {
  const positinID = 'positionid'
  let repo: CategoryRepo;
  let props: CategoryProps; 

  beforeEach(() => {
    props = {
      id: 'asd',
      name:'test',
      positions: [positinID],
      description: 'description'
    }

    repo = {
      entityConstructor: Category,
      all(): any {},
      getByIDs: async function (ids: string[]): Promise<Category[]> {
        return [new Category(props, this)];
      },
      removeByIDs: async function (ids: string[]): Promise<void> {},
      add: async function (entity: Category): Promise<Category> {
        return entity;
      },
      patch: async function (props: CategoryProps): Promise<CategoryProps> {
        return props
      }
    }
  });

  test('Успешное создание категории', () => {
    const category = new Category(props, repo);
    expect(category).toBeInstanceOf(Category);
  });

  test('Нельзя создать категорию без обязательных полей в пропсах', () => {
    try {
      new Category({...props, name: ''}, repo);
    } catch(err) {
      expect(err).toBeInstanceOf(NameIsEmptyError);
    }
  });

  test('Можно переименовать, изменить описание категории', async () => {
    const newName = 'newName';
    const newDescription = 'newDescription';
    const category = new Category(props, repo);

    await category.rename(newName);
    await category.insertDescription(newDescription);

    expect(category.getProp('name')).toEqual(newName);
    expect(category.getProp('description')).toEqual(newDescription);
  });

  test('Добавить новую позицию в категорию', async () => {
    const olivie = new Position({
      id: 'id',
      ingredients: [],
      name: 'olivie',
      price: 23,
    }, repo);
    const category = new Category(props, repo);

    await category.addPosition(olivie);

    expect(Array.isArray(category.getProp('positions'))).toBeTruthy();
    expect((category.getProp('positions') as string[])[1]).toEqual(olivie.id);
  });

  test('Удалить позицию в категорий', async () => {
    const category = new Category(props, repo);

    await category.removePosition(positinID);

    expect(category.getProp('positions')?.length).toBe(0);
  });
});
