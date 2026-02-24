import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBoardDto: CreateBoardDto) {
    return await this.prisma.board.create({
      data: createBoardDto,
    });
  }

  async findAll() {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.board.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.prisma.board.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.board.delete({
      where: { id },
    });
  }
}
