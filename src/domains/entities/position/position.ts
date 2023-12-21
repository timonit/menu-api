import { Entity } from '@/core/domains';
import { PositionProps } from './position.props';
import { Ingredient } from './values';
import {
  IngredientIsNotString,
  NameIsEmptyError,
  NameIsNotString,
  PriceIsNegative, 
  PriceIsNotNumber,
} from './error';
import { PositionRepo } from './position.repo';

export class Position extends Entity<PositionProps> {
  repo!: PositionRepo;

  priceValidate(price: number) {
    if (Number.isNaN(price)) throw new PriceIsNotNumber();
    if (price < 0) throw new PriceIsNegative();
  }

  nameValidate(name: string) {
    if (typeof name !== 'string') throw new NameIsNotString();
    if (!name.trim()) throw new NameIsEmptyError();
  }

  validateProps(props: PositionProps): void {
    this.nameValidate(props.name);
    this.priceValidate(props.price);
  }

  async rename(name: string): Promise<this> {
    this.nameValidate(name);

    this.props = await this.repo.patch({ ...this.props, name });

    return this;
  }

  async changePhoto(photo?: string | null): Promise<this> {
    let newPhoto: string | undefined;

    if (!photo) newPhoto = undefined;
    else newPhoto = photo;

    this.props = await this.repo.patch({ ...this.props, photo: newPhoto });
    
    return this;
  }

  async changePrice(price: number): Promise<this> {
    this.priceValidate(price);

    this.props = await this.repo.patch({ ...this.props, price });

    return this;
  }

  async setIngredients(ingredients: Ingredient[]): Promise<this> {
    if (ingredients.length) {
      ingredients.forEach((ingredient) => {
        if (typeof ingredient !== 'string') throw new IngredientIsNotString();
      });
    }

    this.props = await this.repo.patch({ ...this.props, ingredients});

    return this;
  }
}
