import { Controller, Get, Post, Body, Patch, Param,Query, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}



@ApiOperation({ summary: 'Получение списка всех задач' })
  @ApiResponse({ status: 200, description: 'Список задач успешно получен.' })
    @Get()
  findAll(@Query() query: QueryTaskDto) {
    return this.tasksService.findAll(query);
  }
@ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача успешно получена.' })
  @ApiResponse({ status: 404, description: 'Задача с указанным ID не найдена.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Создание новой задачи' })
  @ApiResponse({ status: 201, description: 'Задача успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные для создания задачи.' })
  @Post()
  create(@Body() dto: CreateTaskDto,
    @Authorized() userId: string) {
    return this.tasksService.create(dto, userId);
  }


  @Authorization()
    @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @Authorized('id') userId: string, // ← из JWT
  ) {
    return this.tasksService.update(id, dto, userId);
  }


@ApiOperation({ summary: 'Удаление задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена.' })
  @ApiResponse({ status: 404, description: 'Задача с указанным ID не найдена.' })
  @Authorization()
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Authorized('id') userId: string, // ← из JWT
    @Authorized('role') userRole: Role, // ← из JWT
  ) {
    return this.tasksService.remove(id, userId, userRole);
  }
}
