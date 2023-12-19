import { Usecase } from '@/core/app';
import { ChangeIngredientsInput, ChangeIngredientsResult } from './types';
import { PositionRepo } from '@/domains';

export class ChangeIngredientsUC extends Usecase<Promise<ChangeIngredientsResult>> {
  async execute(inputDTO: ChangeIngredientsInput, repo: PositionRepo): Promise<ChangeIngredientsResult> {
    const position = (await repo.getByIDs([inputDTO.id]))[0];

    position.setIngredients(inputDTO.ingredients);

    return position.getProp('ingredients');
  }
}
