import { PositionProps } from '@/domains';

export type AddPositionInput = Omit<PositionProps, 'id'>;

export type AddPositionResult = PositionProps
