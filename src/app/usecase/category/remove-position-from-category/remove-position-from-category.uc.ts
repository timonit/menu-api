import { Usecase } from '@/core/app';
import { RemovePositionFromCategoryInput, RemovePositionFromCategoryResult } from './types';
import { CategoryRepo } from '@/domains';

export class RemovePositionFromCategoryUC extends Usecase<Promise<RemovePositionFromCategoryResult>> {
  async execute(inputDTO: RemovePositionFromCategoryInput, categoryRepo: CategoryRepo): Promise<RemovePositionFromCategoryResult> {
    const category = (await categoryRepo.getByIDs([inputDTO.targetCategoryID]))[0];

    await category.removePosition(inputDTO.positionID);

    return category.getProp('positions');
  }
}
