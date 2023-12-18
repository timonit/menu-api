import { Usecase } from '@/core/app';
import { AddPositionToCategoryInput, AddPositionToCategoryResult } from './types';
import { CategoryRepo, Position, PositionRepo } from '@/domains';
import { AddPositionUC } from '../../position';

export class AddPositionToCategoryUC extends Usecase<Promise<AddPositionToCategoryResult>>{
  async execute(inputDTO: AddPositionToCategoryInput, categoryRepo: CategoryRepo, positionRepo: PositionRepo): Promise<AddPositionToCategoryResult> {
    const category = (await categoryRepo.getByIDs([inputDTO.targetCategoryID]))[0];
    let position: Position;
    
    if ('id' in inputDTO.positionDTO) {
      position = (await positionRepo.getByIDs([inputDTO.positionDTO.id]))[0];
    } else {
      const addPositionUC = new AddPositionUC();
      const props = await addPositionUC.execute(inputDTO.positionDTO, positionRepo);

      position = new Position(props, positionRepo);
    }

    category.addPosition(position);

    return category.getProp('positions');
  }
}
