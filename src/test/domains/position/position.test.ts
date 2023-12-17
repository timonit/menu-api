import { Position, PositionProps } from '@/domains';
import { NameIsEmptyError, PriceIsNegative } from '@/domains/entities/position/error';

describe('position', () => {
  const onion = 'onion';
  const props: PositionProps = {
    id: '123',
    name: 'test',
    price: 23,
    ingredients: [onion],
    photo: 'linkPhoto',
  }

  test('Успешное создание позиции', () => {
    const position = Position.create(props);

    expect(position).toBeInstanceOf(Position);
  });

  test('Можно переименовать, изменить цену, изменить ингредиенты, изменить фото', () => {
    const anotherName = 'anotherName';
    const newPrice = 150;
    const newPhotoLink = 'newPhotoLink';
    const newIngredients = ['potatoes', 'carrot'];
    const position = Position.create(props);

    position.rename(anotherName);
    position.changePrice(newPrice);
    position.changePhoto(newPhotoLink);
    position.setIngredients(newIngredients);

    expect(position.getProp('name')).toEqual(anotherName);
    expect(position.getProp('price')).toEqual(newPrice);
    expect(position.getProp('photo')).toEqual(newPhotoLink);
    expect(position.getProp('ingredients')).toEqual(newIngredients);
  });

  test('Нельзя переименовывать на пустое название', () => {
    const emptyName = ' ';
    const position = Position.create(props);

    try {
      position.rename(emptyName);
    } catch(err) {
      expect(err).toBeInstanceOf(NameIsEmptyError);
    }
  });

  test('Нельзя переустанавливать цену ниже 0', () => {
    const subzero = -2;
    const position = Position.create(props);

    try {
      position.changePrice(subzero);
    } catch(err) {
      expect(err).toBeInstanceOf(PriceIsNegative);
    }
  });
});
