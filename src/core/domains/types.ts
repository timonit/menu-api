import { Entity } from './entity';
import { Props } from './props';
import { Repo } from './repo';

export type ID = string;

export type GeneralRepo = Repo<Entity<Props>>;
