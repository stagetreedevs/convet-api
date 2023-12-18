/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepos: Repository<Admin>,
    ) { }

    async create(admin: Admin): Promise<Admin> {
        const verify = await this.findEmail(admin.email);
        if (verify) {
            throw new BadRequestException('Este email já está sendo utilizado.');
        }
        return this.adminRepos.save(admin);
    }

    async findAll(): Promise<Admin[]> {
        return this.adminRepos.find();
    }

    async findOne(id: string): Promise<Admin> {
        return this.adminRepos.findOne({
            where: {
                id: id,
            }
        });
    }

    async findEmail(email: string): Promise<Admin> {
        return this.adminRepos.findOne({
            where: {
                email: email,
            }
        });
    }

    async update(id: string, admin: Admin): Promise<Admin> {
        const verify = await this.findOne(id);

        if(verify.email !== admin.email){
            //Verifica se existe já o email
            const mail = await this.findEmail(admin.email);
            if (mail) {
                throw new BadRequestException('Este email já está sendo utilizado.');
            }
        }
        
        await this.adminRepos.update(id, admin);
        return await this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.adminRepos.delete(id);
    }

}