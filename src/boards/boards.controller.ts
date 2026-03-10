import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
@ApiOperation({ summary: 'Создание новой доски' })
@ApiResponse({ status: 201, description: 'Доска успешно создана.' })
@ApiResponse({ status: 400, description: 'Некорректные данные для создания доски.' })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @ApiOperation({ summary: 'Получение списка всех досок' })
  @ApiResponse({ status: 200, description: 'Список досок успешно получен.' })
  @ApiResponse({ status: 404, description: 'Доски не найдены.' })
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({ summary: 'Получение доски по ID' })
  @ApiResponse({ status: 200, description: 'Доска успешно получена.' })
  @ApiResponse({ status: 404, description: 'Доска с указанным ID не найдена.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Удаление доски по ID' })
  @ApiResponse({ status: 200, description: 'Доска успешно удалена.' })
  @ApiResponse({ status: 404, description: 'Доска с указанным ID не найдена.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
