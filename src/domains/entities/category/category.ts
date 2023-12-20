import { Entity } from '@/core/domains';
import { CategoryProps } from './category.props';
import { Position } from '../position';
import { DescriptionIsEmptyError, NameIsEmptyError } from './error';
import { CategoryRepo } from './category.repo';

export class Category extends Entity<CategoryProps> {
  repo!: CategoryRepo;

  async rename(name: string): Promise<this> {
    if (!name.trim()) throw new NameIsEmptyError();

    this.props = await this.repo.patch({ ...this.props, name });

    return this;
  }

  async insertDescription(description: string): Promise<this> {

    this.props = await this.repo.patch({ ...this.props, description: description.trim() });

    return this;
  }

  async addPosition(position: Position): Promise<this> {
    this.props.positions.push(position.id);
    
    try {
      await this.repo.patch(this.props);
    } catch(err) {
      this.props.positions.pop();
      throw err;
    }
    
    return this;
  }

  async removePosition(positionID: CategoryProps['id']): Promise<this> {
    const positions = this.props.positions.filter(
      (id) => id !== positionID
    );

    this.props = await this.repo.patch({ ...this.props, positions});

    return this;
  }
}
