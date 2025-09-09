import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from '@/helpers/util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isUsernameExist = async (name: string) => {
    const user = await this.userModel.exists({ name })
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    const isExist = await this.isUsernameExist(name);    
    if (isExist) {
      throw new BadRequestException(`Username ${name} đã tồn tại. Vui lòng nhập username khác`);
    }
    const hashPassword = await hashPasswordHelper(createUserDto.password)
    const user = await this.userModel.create({
      name,
      password: hashPassword
    })
    return {
      _id: user._id
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByUsername(name: string) {
    return this.userModel.findOne({name})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
