import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

//Interface which only allows classes to be passed to Serialize Decorator
interface ClassConstructor {
  /* eslint-disable */
  new (...args: any[]): {};
}

/*
  Decorator which enables some fields to be removed when returning object as 
  a response. For example: remove password field when fetching user.
*/
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/*
  Interceptor which is activated on each response and it removes values from
  an object based on the fields that are present in DTO passed as param.
  For example: removes password from User object because UserDto doesn't have that field.
*/
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      })
    );
  }
}
