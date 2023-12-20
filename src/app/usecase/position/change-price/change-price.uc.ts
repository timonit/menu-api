import { Usecase } from '@/core/app';
import { ChangePriceInput, ChangePriceResult } from './types';
import { PositionRepo } from '@/domains';

export class ChangePriceUC extends Usecase<Promise<ChangePriceResult>> {
  async execute(inputDTO: ChangePriceInput, repo: PositionRepo): Promise<ChangePriceResult> {
    const position = (await repo.getByIDs([inputDTO.id]))[0];

    position.changePrice(inputDTO.price);

    return {price: position.getProp('price')};
  }
}
