import { Entity } from '@/core/domains';
import { CategoryProps } from './category.props';
import { Position } from '../position';
import { DescriptionIsEmptyError, NameIsEmptyError } from './error';

export class Category extends Entity<CategoryProps> {
  rename(name: string): this {
    if (!name.trim()) throw new NameIsEmptyError();

    this.props.name = name;
    return this;
  }

  insertDescription(description: string): this {
    if (!description.trim()) throw new DescriptionIsEmptyError();

    this.props.description = description;
    return this;
  }

  addPosition(position: Position): this {
    this.props.positions.push(position.id);
    return this;
  }

  removePosition(positionID: CategoryProps['id']): this {
    this.props.positions = this.props.positions.filter(
      (id) => id !== positionID
    );

    return this;
  }
}
