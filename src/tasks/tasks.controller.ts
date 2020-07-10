import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipes';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  @Get()
  getAll() {
    return this.TasksService.getAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.TasksService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() body: CreateTaskDto) {
    return this.TasksService.createTask(body);
  }

  @Patch()
  updateStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Body('id') id: string,
  ) {
    return this.TasksService.updateStatus(id, status);
  }
}
