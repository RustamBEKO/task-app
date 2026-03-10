import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание новой задачи' })
  @ApiResponse({ status: 201, description: 'Задача успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные для создания задачи.' })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
@ApiOperation({ summary: 'Получение списка всех задач' })
  @ApiResponse({ status: 200, description: 'Список задач успешно получен.' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  } 
@ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача успешно получена.' })
  @ApiResponse({ status: 404, description: 'Задача с указанным ID не найдена.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }


@ApiOperation({ summary: 'Удаление задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена.' })
  @ApiResponse({ status: 404, description: 'Задача с указанным ID не найдена.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
