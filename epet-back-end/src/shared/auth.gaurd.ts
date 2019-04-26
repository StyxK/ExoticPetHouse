import { Injectable, CanActivate, ExecutionContext, HttpException, BadRequestException, HttpStatus, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers.authorization){
            return false
        }
        request.user = await this.validateToken(request.headers.authorization)
        return true
    }

    validateToken(auth:string){
        if(auth.split(' ')[0] !== 'Epet'){
            throw new HttpException('Invalid Token',HttpStatus.FORBIDDEN)
        }
        const token = auth.split(' ')[1]
        try{
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            return decode
        }catch(error){
            const message = `Token error ${error.message || error.name}`
            throw new HttpException(message,HttpStatus.FORBIDDEN)
        }
    }
}