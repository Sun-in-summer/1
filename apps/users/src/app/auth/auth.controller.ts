import {ApiTags, ApiResponse} from '@nestjs/swagger';
import { Controller, HttpCode, HttpStatus, Post , Body, Get, Param, UseGuards, Req, UseFilters, Patch} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@guitar/core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser } from '@guitar/shared-types';
import { HttpExceptionFilter } from './http.exception-filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor (
    private readonly authService: AuthService
  ){}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new user has been successfully created '})
  async create(@Body() dto: CreateUserDto){
    const newUser = await  this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: "User has been successfully logged."
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Password or Login is wrong."
  })
  async login(@Req() request: RequestWithUser){
    const {user }= request;
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>){
    const {user: tokenPayload} =request;
    return this.authService.loginUser({
      firstname: tokenPayload.firstname,
      lastname: tokenPayload.lastname,
      role: tokenPayload.role,
      email: tokenPayload.email,
      _id: tokenPayload.sub
    }, tokenPayload.refreshTokenId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: "User has been found"
  })
  async show(@Param('id', MongoidValidationPipe) id: string){

    const existedUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existedUser);
  }


  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: HttpStatus.OK, description: 'The user has been successfully updated '})
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: CreateUserDto){
    const newUser = await  this.authService.updateUser(id, dto);
    return fillObject(UserRdo, newUser);
  }
}
