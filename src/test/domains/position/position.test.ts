import { Position, PositionProps, PositionRepo } from '@/domains';
import { NameIsEmptyError, PriceIsNegative } from '@/domains/entities/position/error';

describe('position', () => {
  const onion = 'onion';
  let repo: PositionRepo;
  let props: PositionProps;

  beforeEach(() => {
    props = {
      id: '123',
      name: 'test',
      price: 23,
      ingredients: [onion],
      photo: 'linkPhoto',
    };

    repo = {
      entityConstructor: Position,
      getByIDs: async function (ids: string[]): Promise<Position[]> {
        return [new Position(props, this)];
      },
      removeByIDs: async function (ids: string[]): Promise<void> {},
      add: async function (entity: Position): Promise<Position> {
        return entity;
      },
      patch: async function (props: PositionProps): Promise<PositionProps> {
        return props;
      }
    };
  })

  test('Успешное создание позиции', async () => {
    const position = new Position(props, repo);

    expect(position).toBeInstanceOf(Position);
  });

  test('Можно переименовать, изменить цену, изменить ингредиенты, изменить фото', async () => {
    const anotherName = 'anotherName';
    const newPrice = 150;
    const newPhotoLink = 'newPhotoLink';
    const newIngredients = ['potatoes', 'carrot'];
    const position = new Position(props, repo);

    await position.rename(anotherName);
    await position.changePrice(newPrice);
    await position.changePhoto(newPhotoLink);
    await position.setIngredients(newIngredients);

    expect(position.getProp('name')).toEqual(anotherName);
    expect(position.getProp('price')).toEqual(newPrice);
    expect(position.getProp('photo')).toEqual(newPhotoLink);
    expect(position.getProp('ingredients')).toEqual(newIngredients);
  });

  test('Нельзя переименовывать на пустое название', async () => {
    const emptyName = ' ';
    const position = new Position(props, repo);

    try {
      await position.rename(emptyName);
    } catch(err) {
      expect(err).toBeInstanceOf(NameIsEmptyError);
    }
  });

  test('Нельзя переустанавливать цену ниже 0', async () => {
    const subzero = -2;
    const position = new Position(props, repo);

    try {
      await position.changePrice(subzero);
    } catch(err) {
      expect(err).toBeInstanceOf(PriceIsNegative);
    }
  });
});
