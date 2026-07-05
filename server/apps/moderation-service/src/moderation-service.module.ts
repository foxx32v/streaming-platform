import { Module } from '@nestjs/common';
import { ModerationServiceController } from './moderation-service.controller';
import { ModerationServiceService } from './moderation-service.service';

@Module({
  imports: [],
  controllers: [ModerationServiceController],
  providers: [ModerationServiceService],
})
export class ModerationServiceModule {}
