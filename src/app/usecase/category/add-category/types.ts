import { CategoryProps } from '@/domains';

export type AddCategoryInput = Omit<CategoryProps, 'id'>;

export type AddCategoryResult = CategoryProps;
