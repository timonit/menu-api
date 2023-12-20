import { Category, CategoryProps, CategoryRepo } from '@/domains';
import { prisma } from './prisma';

export class CategoryStorage extends CategoryRepo {
  async all(): Promise<Category[]> {
    const categoriesData = await prisma.category.findMany({
      include: {
        positions: {
          select: {
            id: true
          }
        }
      }
    });
    await prisma.$disconnect();

    return categoriesData.map(
      (props) => {
        const positions: string[] = props.positions.map((pos) => pos.id);
        return new Category({...props, description: props.description ?? undefined, positions }, this)}
    );
  }

  async getByIDs(ids: string[]): Promise<Category[]> {
    const categoriesData = await prisma.category.findMany(
      {
        where: {
          id: { in: ids }
        },
        include: {
          positions: {
            select: {
              id: true
            }
          }
        }
      }
    );
    await prisma.$disconnect();

    return categoriesData.map(
      (props) => {
        const positions: string[] = props.positions.map((pos) => pos.id);
        
        return new Category({ ...props, description: props.description ?? undefined, positions }, this);
      }
    );
  }

  async removeByIDs(ids: string[]): Promise<void> {
    await prisma.category.deleteMany(
      { 
        where: { id: { in: ids } },
      }
    );
    await prisma.$disconnect();
  }

  async add(entity: Category): Promise<Category> {
    const result = await prisma.category.create({
      data: {
        id: entity.id,
        name: entity.getProp('name'),
        description: entity.getProp('description'),
        positions: {
          connect: entity.getProp('positions').map<{id: string}>(id => ({id}))
        }
      },
      include: {
        positions: {
          select: {
            id: true
          }
        }
      }
    });
    await prisma.$disconnect();

    const positions: string[] = result.positions.map((pos) => pos.id);
    
    return new Category({...result, positions, description: result.description ?? undefined }, this);
  }

  async patch(props: CategoryProps): Promise<CategoryProps> {
    const result = await prisma.category.update({
      where: {
        id: props.id,
      },
      data: {
        name: props.name,
        description: props.description,
        positions: {
          set: props.positions.map<{id: string}>(id => ({id})),
        }
      },
      include: {
        positions: {
          select: {
            id: true
          }
        }
      }
    });
    await prisma.$disconnect();

    const positions: string[] = result.positions.map((pos) => pos.id);

    return {...result, positions, description: result.description ?? undefined };
  }
}
