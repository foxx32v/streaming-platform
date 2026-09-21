import { applyDecorators } from "@nestjs/common";
import { MinLength, MaxLength, Matches, IsString } from "class-validator";
import { USER_STATUS_DECORATOR_CONFIG } from "../../configs";

export function IsUserStatus() {
    return applyDecorators(
        IsString(),
        MinLength(USER_STATUS_DECORATOR_CONFIG.MIN_LENGTH),
        MaxLength(USER_STATUS_DECORATOR_CONFIG.MAX_LENGTH),
        Matches(USER_STATUS_DECORATOR_CONFIG.REGULAR, {
        message: USER_STATUS_DECORATOR_CONFIG.MESSAGE
}))}