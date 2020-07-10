import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository, getConnection } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
     @InjectRepository(TaskEntity)
     private TaskRepository: Repository<TaskEntity>,
  ) {}


  // transaction test even if i use one table only...
  // async createOne(body: CreateTaskDto) {
  //   const connection = getConnection();
  //   const queryRunner = connection.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
    
  //   try {
  //     const { title, description } = body;
  //     const task = {
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };

  //     const newTask = await queryRunner.manager.save(TaskEntity, task);
  //     await queryRunner.commitTransaction();

  //     return newTask;
  //   } catch (err) {
  //     console.log(err);
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  getAll(): Promise<TaskEntity[]> {
    return this.TaskRepository.find();
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.TaskRepository
    .createQueryBuilder("task")
    // .select("task.title")
    // .addSelect("task.status")
    .where("task.id = :id", { id })
    .getOne();
    if(!task) {
      throw new NotFoundException(`Task with id ${id} doesn't exist`)
    }
    return task;
  }

  async createTask(body: CreateTaskDto): Promise<TaskEntity> {

    const { title, description } = body;
    const task = {
      title,
      description,
      status: TaskStatus.DONE,
    };
    const saveTask = await this.TaskRepository.save(task);
    return saveTask;
  };

  async updateStatus(id: string, status: TaskStatus): Promise<string> {
     await this.TaskRepository
    .createQueryBuilder()
    .update('task_entity')
    .set({ status })
    .where("id = :id", { id })
    .execute();
  
    return `task with id ${id} has been updated: status = ${status}`;
  }
}
