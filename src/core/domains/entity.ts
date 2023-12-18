import { Props } from './props';
import { Repo } from './repo';
import { GeneralRepo } from './types';


export abstract class Entity<P extends Props> {
  props: P;

  repo: GeneralRepo;

  get id(): P['id'] {
    return this.props.id;
  }

  constructor(props: P, repo: GeneralRepo) {
    this.props = props;
    this.repo = repo;
  }

  getProp<K extends keyof P>(propName: K): P[K] {
    return this.props[propName];
  }
}
