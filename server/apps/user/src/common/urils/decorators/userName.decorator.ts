import { applyDecorators } from "@nestjs/common";
import { MinLength, MaxLength, Matches, IsString } from "class-validator";
import { USERNAME_DECORATOR_CONFIG } from "../../configs";

export function IsUserName() {
    return applyDecorators(
        IsString(),
        MinLength(USERNAME_DECORATOR_CONFIG.MIN_LENGTH),
        MaxLength(USERNAME_DECORATOR_CONFIG.MAX_LENGTH),
        Matches(USERNAME_DECORATOR_CONFIG.REGULAR, {
        message: USERNAME_DECORATOR_CONFIG.MESSAGE
}))}