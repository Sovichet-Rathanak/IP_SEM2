import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ){}

  getAllTasks(){
    return this.tasksRepo.find();
  }

  createTask(taskData: Partial<Task>){
    const task = this.tasksRepo.create(taskData)
    return this.tasksRepo.save(task);
  }

  findTaskByName(name: string){
    return this.tasksRepo.findOne({where: {name}});
  }

  async updateTaskByName(name: string, updateData: Partial<Task>){
    await this.tasksRepo.update({name}, updateData);
    return this.findTaskByName(name);
  }

  deleteTaskByName(name:string){
    return this.tasksRepo.delete({name});
  }

  async deleteAllTasks(){
    return this.tasksRepo.clear();
  }

  async toggleTaskCompletionByName(name: string) {
    const task = await this.tasksRepo.findOne({ where: { name } });
    if (!task) return null;
  
    task.completedAt = task.completedAt ? null : new Date();
    return this.tasksRepo.save(task);
  }   
}
