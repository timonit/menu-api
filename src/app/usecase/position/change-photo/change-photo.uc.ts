import { Usecase } from '@/core/app';
import { ChangePhotoInput, ChangePhotoResult } from './types';
import { PositionRepo } from '@/domains';

export class ChangePhotoUC extends Usecase<Promise<ChangePhotoResult>> {
  async execute(inputDTO: ChangePhotoInput, repo: PositionRepo): Promise<string> {
    const position = (await repo.getByIDs([inputDTO.id]))[0];

    position.changePhoto(inputDTO.photo);

    return position.id;
  }
}
