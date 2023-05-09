/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
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
