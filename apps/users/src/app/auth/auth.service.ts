import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { CommandEvent, RefreshTokenPayload, TokenPayload, User, UserRole } from '@guitar/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import dayjs from 'dayjs';
import { ShopUserRepository } from '../shop-user/shop-user.repository';
import { ShopUserEntity } from '../shop-user/shop-user.entity';
import { RABBITMQ_SERVICE} from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@guitar/core';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '../../config/jwt.config';
import {
  UserNotFoundException,
  UserExistsException,
  UserPasswordWrongException,
  UserNotRegisteredException
} from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';


@Injectable()
export class AuthService {
  constructor (
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    @Inject(jwtConfig.KEY) private readonly jwtMainConfig: ConfigType<typeof jwtConfig>
  ){}

  async register(dto: CreateUserDto){
    const {email, birthDate, firstname, lastname, password, isSubscribed} = dto;

    const shopUser ={
    email,
    birthDate: dayjs(birthDate).toDate(),
    lastname, firstname,
    role: UserRole.User,
    avatar: dto.avatar ? dto.avatar: '',
    passwordHash: '',
    isSubscribed
    }

    const existUser = await this.shopUserRepository
      .findByEmail(email);
    if (existUser) {
      throw new UserExistsException(email);
    }

    const userEntity = await  new ShopUserEntity(shopUser)
      .setPassword(password);

    const createdUser = await this.shopUserRepository
      .create(userEntity);

      this.rabbitClient.emit(
        createEvent(CommandEvent.AddSubscriber),////
        {
          id: createdUser._id,
          firstname: createdUser.firstname,
          lastname: createdUser.lastname,
          email: createdUser.email,
          isSubscribed: createdUser.isSubscribed,
        }
      )

      return createdUser;
  }

  async verifyUser(dto: LoginUserDto){
    const {email, password}= dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const shopUserEntity = new ShopUserEntity(existUser);
    if (! await shopUserEntity.comparePassword(password)){
      throw new UserPasswordWrongException();
    }

    return shopUserEntity.toObject();

  }

  async getUser(id: string) {
    const existUser =  await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new UserNotFoundException(id);
    }
    return  existUser;
  }

  async loginUser(user: Pick<User, '_id'| 'email'| 'role'|'lastname' | 'firstname'>, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtMainConfig.refreshTokenSecret,
        expiresIn: this.jwtMainConfig.refreshTokenExpiresIn,
      }),
    }
  }

  async updateUser(id: string, dto:CreateUserDto) {

     const existUser = await this.shopUserRepository.findById(id);

    if (!existUser) {
      throw new UserExistsException(dto.email);
    }
     const updatedUserEntity =await new ShopUserEntity({...existUser, ...dto});
     const updatedUser =  this.shopUserRepository.update(id, updatedUserEntity);


    this.rabbitClient.emit(
        createEvent(CommandEvent.DeleteSubscriber),////
        {
          id: updatedUserEntity._id,
          firstname: updatedUserEntity.firstname,
          lastname: updatedUserEntity.lastname,
          email: updatedUserEntity.email,
          isSubscribed: updatedUserEntity.isSubscribed,
        }
      )

    return updatedUser;

  }
}
