import { Props } from '@/core/domains';
import { ID } from '@/core/domains/types';

export interface CategoryProps extends Props {
  name: string;

  description?: string;

  positions: ID[];
}
