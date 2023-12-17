import { Props } from './props';
import { Entity } from './entity';

export abstract class Repo<P extends Props, E extends Entity<P>> {
  abstract entityConstructor: { create (props: P): E };

  abstract getByIDs(ids: P['id']): Promise<E>;

  abstract removeByIDs(ids: P['id']): Promise<void>;

  abstract add(props: Omit<P, 'id'>): Promise<E>;

  abstract patch(props: P): Promise<E>;
}
