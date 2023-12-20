import { Usecase } from '@/core/app';
import { ChangeDescriptionCategoryInput, ChangeDescriptionCategoryResult } from './types';
import { CategoryRepo } from '@/domains';

export class ChangeDescriptionCategoryUC extends Usecase<Promise<ChangeDescriptionCategoryResult>> {
  async execute(inputDTO: ChangeDescriptionCategoryInput, repo: CategoryRepo): Promise<ChangeDescriptionCategoryResult> {
    const category = (await repo.getByIDs([inputDTO.id]))[0];

    await category.insertDescription(inputDTO.description);

    return {description: category.getProp('description') ?? ''};
  }
}
