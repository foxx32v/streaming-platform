import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { KAFKA_CONFIG, EmitUserCreateDTO } from '@app/kafka';

@Controller()
export class UserConsumer {
    constructor(private readonly userService: UserService) {}

    @EventPattern(KAFKA_CONFIG.TOPICS.USER_CREATED)
    async handleUserCreated(@Payload() data: EmitUserCreateDTO) {
        await this.userService.init(data.userId, data.userName);
    }
}