import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    //Create user entity
    const user = this.usersRepository.create(createUserDto);
    //Save user entity to DB
    return this.usersRepository.save(user);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User[]> {
    return this.usersRepository.find({ where: { email } });
  }
}
