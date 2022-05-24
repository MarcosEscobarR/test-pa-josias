import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Result } from '../shared/Result';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({ Name, Email, LastName, Password}: CreateUserDto): Promise<Result> {
    const user = new User(Name,LastName,Email,await this.hashPassword(Password));
    await this.userRepository.save(user);
    return Result.ok();
  }

  async findAll(): Promise<Result> {
    return Result.ok(await this.userRepository.find());
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ Email: email });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ Id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Result> {
    await this.userRepository.update({ Id: id }, updateUserDto as User);
    return Result.ok();
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(insertedPassword: string, userPassword: string) {
    return bcrypt.compareSync(insertedPassword, userPassword);
  }
}
