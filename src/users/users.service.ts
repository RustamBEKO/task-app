import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {id},
    });
  }
  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {id},
    });
  }
}