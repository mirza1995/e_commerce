import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { JwtValidationResponseDto } from '../dtos/jwt-validation-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')
    });
  }

  /*
    Passport first verifies the JWT's signature and decodes the JSON. 
    It then invokes this validate() method passing the decoded JSON as its single parameter.
    Based on the way JWT signing works, we're guaranteed that we're receiving a valid
    token that we have previously signed and issued to a valid user.
  */
  async validate(payload: JwtPayloadDto): Promise<JwtValidationResponseDto> {
    return { userId: payload.sub, email: payload.email };
  }
}
