import { Repo } from '@/core/domains';
import { Category } from './category';

export abstract class CategoryRepo extends Repo<Category> {
  entityConstructor = Category;
}
