import { Category, CategoryProps, Position } from '@/domains';
import { NameIsEmptyError } from '@/domains/entities/category/error';

describe('category', () => {
  const positinID = 'positionid'
  let props: CategoryProps; 

  beforeEach(() => {
    props = {
      id: 'asd',
      name:'test',
      positions: [positinID],
      description: 'description'
    }
  });

  test('Успешное создание категории', () => {
    const category = Category.create(props);
    expect(category).toBeInstanceOf(Category);
  });

  test('Нельзя создать категорию без обязательных полей в пропсах', () => {
    try {
      Category.create({...props, name: ''});
    } catch(err) {
      expect(err).toBeInstanceOf(NameIsEmptyError);
    }
  });

  test('Можно переименовать, изменить описание категории', () => {
    const newName = 'newName';
    const newDescription = 'newDescription';
    const category = Category.create(props);

    category.rename(newName);
    category.insertDescription(newDescription);

    expect(category.getProp('name')).toEqual(newName);
    expect(category.getProp('description')).toEqual(newDescription);
  });

  test('Добавить новую позицию в категорию', () => {
    const olivie = Position.create({
      id: 'id',
      ingredients: [],
      name: 'olivie',
      price: 23,
    });
    const category = Category.create(props);

    category.addPosition(olivie);

    expect(Array.isArray(category.getProp('positions'))).toBeTruthy();
    expect((category.getProp('positions') as string[])[1]).toEqual(olivie.id);
  });

  test('Удалить позицию в категорий', () => {
    const category = Category.create(props);

    category.removePosition(positinID);

    expect(category.getProp('positions')?.length).toBe(0);
  });
});
