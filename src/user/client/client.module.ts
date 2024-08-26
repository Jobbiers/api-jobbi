import { Module } from '@nestjs/common';
import { UserClientService } from './client.service';
import { UserClientController } from './client.controller';

@Module({
  controllers: [UserClientController],
  providers: [UserClientService],
})
export class UserClientModule {}
