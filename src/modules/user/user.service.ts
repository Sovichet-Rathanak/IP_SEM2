import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {  
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ){}

  getAllUsers(){
    return this.usersRepo.find();
  }

  createUser(userData: Partial<User>){
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  findAllUsers(){
    return this.usersRepo.find({relations: ['tasks']});
  }

  findUserByID(id: number){
    return this.usersRepo.findOne({where: {id}, relations: ['tasks']});
  }

  async updateUserByID(id: number, updateData: Partial<User>){
    await this.usersRepo.update(id, updateData);
    return this.findUserByID(id);
  }

  remove(id: number){
    return this.usersRepo.delete(id);
  }
}
