import { Props } from './props';
import { Entity } from './entity';
import { GeneralRepo } from './types';

export type FindFilter<T extends Props> = {
  [P in keyof T]: T[P] | T[P][]
};

export abstract class Repo<E extends Entity<Props>> {
  abstract entityConstructor: { new (props: any, repo: GeneralRepo): E };

  abstract all(): Promise<E[]>;

  abstract getByIDs(ids: Array<E['props']['id']>): Promise<E[]>;

  abstract removeByIDs(ids: Array<E['props']['id']>): Promise<void>;

  abstract add(entity: E): Promise<E>;

  abstract patch(props: E['props']): Promise<E['props']>;
}
