import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { auth } from 'src/config/firebase';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization']
    if (!authorization) {
      throw new UnauthorizedException('No token provided'); // No hay token, no se permite el acceso
    }
    const token = authorization.split(' ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(token);
        request.user = decodedToken;
        return true
      } catch (error) {
        console.error("Error verifying ID token:", error);
        throw new UnauthorizedException('Error verifying ID token')
    }
  }
}