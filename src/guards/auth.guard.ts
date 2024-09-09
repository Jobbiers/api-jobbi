import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { auth } from 'src/config/firebase';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return false; // No hay token, no se permite el acceso
    }

    try {
        await auth.verifyIdToken(token);
        return true
      } catch (error) {
        console.error("Error verifying ID token:", error);
        return false
    }
  }
}