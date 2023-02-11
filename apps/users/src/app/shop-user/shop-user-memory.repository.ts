import {CRUDRepository} from '@guitar/core'
import { User } from '@guitar/shared-types';
import { ShopUserEntity } from './shop-user.entity.js';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopUserMemoryRepository implements CRUDRepository<ShopUserEntity, string, User>{
  private repository: {[key: string]: User} ={};

  public async findByEmail(email: string): Promise <User> {
    const existUser = Object.values(this.repository)
    .find((userItem)=> userItem.email===email);

    if (!existUser) {
      return null;
    }
    return existUser;

  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]){
      return {...this.repository[id]};
    }
    return null;
  }
  public async create(item: ShopUserEntity): Promise<User> {
    const entry ={ ...item.toObject(), _id: crypto.randomUUID()}
    this.repository[entry._id]=entry;

    return {...entry};
  }
  public async update(id: string, item: ShopUserEntity): Promise<User> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async  destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
b
}
