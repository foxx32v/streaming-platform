import { applyDecorators } from "@nestjs/common";
import { MinLength, MaxLength, Matches, IsString } from "class-validator";
import { USERNAME_DECORATOR } from "../config/decorator.config";

export function IsUserName() {
    return applyDecorators(
        IsString(),
        MinLength(USERNAME_DECORATOR.MIN_LENGTH),
        MaxLength(USERNAME_DECORATOR.MAX_LENGTH),
        Matches(USERNAME_DECORATOR.REGULAR, {
        message: USERNAME_DECORATOR.MESSAGE
}))}