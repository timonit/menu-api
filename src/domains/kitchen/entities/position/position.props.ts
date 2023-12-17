import { Props } from '@/core/domains';

export interface PositionProps extends Props {
  name: string;

  price: number;

  photo?: string;
}
