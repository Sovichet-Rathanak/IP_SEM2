import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) { }

  @Get('/')
  getAllTask() {
    return this.taskService.getAllTasks();
  }

  @Post('/')
  createTask(@Body() body: createTaskDto) {
    return this.taskService.createTask(body);
  }

  @Get('/:taskname')
  findTaskByName(@Param('taskname') taskname: string) {
    return this.taskService.findTaskByName(taskname);
  }

  @Patch('/:taskname')
  updateTaskByName(
    @Param('taskname') taskname: string,
    @Body() body: { name: string; description: string },
  ) {
    return this.taskService.updateTaskByName(taskname, body);
  }

  @Delete('/:taskname')
  deleteTaskByName(@Param('taskname') taskname: string) {
    return this.taskService.deleteTaskByName(taskname);
  }

  @Delete()
  deletAllTasks(){
    return this.taskService.deleteAllTasks();
  }

  @Patch(':taskname/toggle')
  async toggleTaskByName(@Param('taskname') taskname: string) {
    return this.taskService.toggleTaskCompletionByName(taskname);
  }
}
