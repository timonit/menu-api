import { Props } from '@/core/domains';
import { Ingredient } from './values';

export interface PositionProps extends Props {
  name: string;

  price: number;

  photo?: string;

  ingredients: Ingredient[];
}
