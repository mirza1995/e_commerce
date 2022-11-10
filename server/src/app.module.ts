import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` //Create global config module
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      //Creates a validation pipe for all request
      useValue: new ValidationPipe({
        whitelist: true //Removes all properties which are not defined in DTOs
      })
    }
  ]
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
