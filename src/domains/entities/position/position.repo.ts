import { Repo } from '@/core/domains';
import { Position } from './position';
import { PositionProps } from './position.props';

export abstract class PositionRepo extends Repo<PositionProps, Position> {
  entityConstructor = Position;
}
