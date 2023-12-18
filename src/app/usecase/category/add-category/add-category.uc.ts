import { Usecase } from '@/core/app';
import { AddCategoryInput, AddCategoryResult } from './types';
import { Category, CategoryProps, CategoryRepo } from '@/domains';
import { randomUUID } from 'crypto';

export class AddCategoryUC extends Usecase<Promise<AddCategoryResult>> {
  async execute(inputDTO: AddCategoryInput, repo: CategoryRepo): Promise<AddCategoryResult> {
    const category = new Category({...inputDTO, id: randomUUID()}, repo);

    const addedCategory = await repo.add(category);

    return addedCategory.props;
  }
}
