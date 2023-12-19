import { FindFilter } from '@/core/domains';
import { Position, PositionProps, PositionRepo } from '@/domains';
import { PrismaClient } from '@prisma/client';


export class PositionStorage extends PositionRepo {
  async all(): Promise<Position[]> {
    const prisma = new PrismaClient();

    const positionsData = await prisma.position.findMany();
    prisma.$disconnect();

    return positionsData.map(
      (props) => new Position({...props, photo: props.photo ?? undefined}, this)
    );
  }

  async getByIDs(ids: string[]): Promise<Position[]> {
    const prisma = new PrismaClient();

    const positionsData = await prisma.position.findMany(
      {
        where: {
          id: { in: ids }
        }
      }
    );
    prisma.$disconnect();

    return positionsData.map(
      (props) => new Position({...props, photo: props.photo ?? undefined}, this)
    );
  }

  async removeByIDs(ids: string[]): Promise<void> {
    const prisma = new PrismaClient();

    await prisma.position.deleteMany(
      { 
        where: { id: { in: ids } },
      }
    );
    prisma.$disconnect();
  }

  async add(entity: Position): Promise<Position> {
    const prisma = new PrismaClient();

    const result = await prisma.position.create({
      data: entity.props
    });
    prisma.$disconnect();

    return new Position({...result, photo: result.photo ?? undefined }, this);
  }

  async patch(props: PositionProps): Promise<PositionProps> {
    const prisma = new PrismaClient();

    const result = await prisma.position.update({
      where: {
        id: props.id,
      },
      data: props
    });
    prisma.$disconnect();

    return {...result, photo: result.photo ?? undefined };
  }
}
