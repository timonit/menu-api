import { Entity } from '@/core/domains';
import { PositionProps } from './position.props';
import { Ingredient } from './values';
import {
  IngredientIsNotString,
  NameIsEmptyError,
  PhotoIsEmptyError,
  PriceIsNegative, 
} from './error';

export class Position extends Entity<PositionProps> {
  rename(name: string): this {
    if (!name.trim()) throw new NameIsEmptyError();

    this.props.name = name;
    return this;
  }

  changePhoto(photo?: string | null): this {
    if (!photo) {
      this.props.photo = undefined;
    } else {
      this.props.photo = photo;
    }

    return this;
  }

  changePrice(price: number): this {
    if (price < 0) throw new PriceIsNegative();

    this.props.price = price;
    return this;
  }

  setIngredients(ingredients: Ingredient[]): this {
    if (ingredients.length) {
      ingredients.forEach((ingredient) => {
        if (typeof ingredient !== 'string') throw new IngredientIsNotString();
      });
    }

    this.props.ingredients = ingredients;
    return this;
  }
}
