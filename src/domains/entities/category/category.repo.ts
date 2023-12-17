import { Repo } from '@/core/domains';
import { Category } from './category';
import { CategoryProps } from './category.props';

export abstract class CategoryRepo extends Repo<CategoryProps, Category> {
  entityConstructor = Category;
}
