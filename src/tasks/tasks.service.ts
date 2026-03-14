import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { UpdateTaskDto} from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  // userId comes from the JWT, NOT from the request body
  async create(dto: CreateTaskDto, userId: string) {
    return await this.prisma.task.create({
      data: { ...dto, userId },
       //data: dto
      //{
        // rating: dto.rating,
        // comment: dto.comment,
        // movieId: dto.movieId,
        // title: dto.title,
        // description: dto.description,
        // status: dto.status,
        // boardId: dto.boardId
      //},
    });
  }

  // async findAll() {
  //   return await this.prisma.task.findMany({
  //     include: {
  //       user: true,
  //       board: true,
  //     },
  //   });
  // }

  async findAll(query: QueryTaskDto) {
    const {
      page = 1,
      limit = 10,
      title,
      description,
      status,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    // Build the WHERE clause dynamically
    const where: any = {};
    // if (genre) where.genre = genre;
    // if (year) where.year = year;
    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (description) where.description = { contains: description, mode: 'insensitive' };
    if (status) where.status = { contains: status, mode: 'insensitive' };

    const skip = (page - 1) * limit; // e.g. page 2, limit 10 → skip 10

    // Run data query AND count query at the same time (parallel = faster)
    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip,
        take: limit,
        include: {
          //_count: { select: { boards: true } }, // adds the boardsCount
          board: true,
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      meta: {
        total,              // total matching records
        page,               // current page
        limit,              // items per page
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: {id},
    });
  }



    async update(id: number, dto: UpdateTaskDto, userId: string) {
    const review = await this.prisma.task.findUnique({ where: { id } });

    if (!review) throw new NotFoundException('Отзыв не найден');

    // Only the owner can edit their review
    if (review.userId !== userId) {
      throw new ForbiddenException('Вы можете редактировать только свой отзыв');
    }

    return await this.prisma.task.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: string, userRole: Role) {
    const review = await this.prisma.task.findUnique({ where: { id } });

    if (!review) throw new NotFoundException('Отзыв не найден');

    // Admins scan delete any review; regular users only their own
    if (userRole !== Role.ADMIN && review.userId !== userId) {
      throw new ForbiddenException('Вы можете удалять только свои отзывы');
    }

    return await this.prisma.task.delete({ where: { id } });
  }
}