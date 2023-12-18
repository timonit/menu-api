import { Usecase } from '@/core/app';
import { RenameCategoryInput, RenameCategoryResult } from './types';
import { CategoryRepo } from '@/domains';

export class RenameCategoryUC extends Usecase<RenameCategoryResult> {
  async execute(inputDTO: RenameCategoryInput, repo: CategoryRepo): RenameCategoryResult {
    const category = (await repo.getByIDs([inputDTO.id]))[0];

    await category.rename(inputDTO.name);

    return {name: category.getProp('name')};
  }
}
