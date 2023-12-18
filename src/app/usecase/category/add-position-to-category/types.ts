import { PositionProps } from '@/domains';

export type AddPositionToCategoryInput = {
  targetCategoryID: string;
  positionDTO: Omit<PositionProps, 'id'> | PositionProps;
}

export type AddPositionToCategoryResult = string[];
