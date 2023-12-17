import { Props } from './props';

export abstract class Entity<P extends Props> {
  props: P;

  constructor(props: P) {
    this.props = props;
  }
}
