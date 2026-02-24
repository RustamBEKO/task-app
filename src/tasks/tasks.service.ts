import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: {id},
    });
  }



  async remove(id: number) {
    return await this.prisma.task.delete({
      where: {id},
    });
  }
}
