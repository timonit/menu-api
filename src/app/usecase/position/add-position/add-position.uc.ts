import { Usecase } from '@/core/app';
import { AddPositionInput, AddPositionResult } from './types';
import { Position, PositionRepo } from '@/domains';
import { randomUUID } from 'crypto';

export class AddPositionUC extends Usecase<Promise<AddPositionResult>> {
  async execute(inputDTO: AddPositionInput, positionRepo: PositionRepo): Promise<AddPositionResult> {
    const id = randomUUID() as string;
    const position = new Position({...inputDTO, id}, positionRepo);

    const addedPostion = await positionRepo.add(position);

    return addedPostion.props;
  }
}
