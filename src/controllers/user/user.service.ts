/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CycleService } from '../cycle/cycle.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private cycle: CycleService
  ) { }

  async create(user: User): Promise<User> {
    const createdUser = await this.userRepository.save(user);

    const body = {
      "user": createdUser.id
    }

    this.cycle.create(body);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findSelected(): Promise<{ id: string, name: string }[]> {
    return this.userRepository.find({ select: ['id', 'name'] });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      }
    });
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    this.cycle.deleteByUser(id);
    await this.userRepository.delete(id);
  }

  async upload(username: any, file: Express.Multer.File) {
    const storage = getStorage();
    const { originalname } = file;
    const { mimetype } = file;
    const type = mimetype.split('/').join('.');
    const metadata = {
      contentType: `${type}`,
    };
    const fileRef = ref(storage, `${username.username}/${originalname}`);
    const uploaded = await uploadBytes(fileRef, file.buffer, metadata);
    const link = {
      url: ""
    }
    link.url = await getDownloadURL(uploaded.ref).then((url) => { return url });
    return link;
  }
}
