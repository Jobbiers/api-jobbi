import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(body): string {
    return 'Hello World!';
  }
}
