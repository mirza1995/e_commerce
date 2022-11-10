import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { LoginResponseDto } from '../dtos/login-response.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /*
    Creates new user based on the information provided in CreateUserDto.
  */
  async signup(createUserDto: CreateUserDto) {
    const users = await this.usersService.findByEmail(createUserDto.email);

    if (users.length) {
      throw new BadRequestException('Email is already in use.');
    }

    const hashedPassword = await this.createHashedPassword(
      createUserDto.password
    );
    createUserDto.password = hashedPassword;

    return this.usersService.create(createUserDto);
  }

  /*
    Validated user by checking if combination of email and password is valid.
    If user is not valid, returns null.
  */
  async validateUser(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (user) {
      const [salt, storedHash] = user.password.split('.');

      const hash = await this.getHash(password, salt);

      return storedHash !== hash ? null : user;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    //Based on jwt documentation, "sub" field is used for passing password.
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  /*
    Creates random salt, hashes password with that salt and returns
    combination of salt + "." + hashed password.
  */
  private async createHashedPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = await this.getHash(password, salt);

    return salt + '.' + hash;
  }

  /*
    Creates hashed password with salt.
  */
  private async getHash(password, salt): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return hash.toString('hex');
  }
}
