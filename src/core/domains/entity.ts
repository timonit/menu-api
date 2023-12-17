import { Props } from './props';

export abstract class Entity<P extends Props> {
  props: P;

  get id(): P['id'] {
    return this.props.id;
  }

  static create<P extends Props, E extends Entity<P>>( this: { new (props: P): E }, props: P ): E {
    return new this(props);
  }

  constructor(props: P) {
    this.props = props;
  }

  getProp(propName: keyof P): typeof this.props[keyof P] {
    return this.props[propName];
  }
}
