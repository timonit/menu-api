import { Repo } from '@/core/domains';
import { Position } from './position';

export abstract class PositionRepo extends Repo<Position> {
  entityConstructor = Position;
}
