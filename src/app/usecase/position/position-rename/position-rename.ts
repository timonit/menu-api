import { Usecase } from '@/core/app';
import { PositionRenameInput, PositionRenameResult } from './types';
import { PositionRepo } from '@/domains';

export class PositionRenameUC extends Usecase<Promise<PositionRenameResult>> {
  async execute(inputDTO: PositionRenameInput, repo: PositionRepo): Promise<PositionRenameResult> {
    const position = (await repo.getByIDs([inputDTO.id]))[0];

    await position.rename(inputDTO.name);

    return position.getProp('name');
  }
}
