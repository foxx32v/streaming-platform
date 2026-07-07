import { applyDecorators } from '@nestjs/common';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { PASSWORD_DECORATOR } from '../config/decorator.config';

export function IsPassword() {
    return applyDecorators(
    IsString(),
    MinLength(PASSWORD_DECORATOR.MIN_LENGTH),
    MaxLength(PASSWORD_DECORATOR.MAX_LENGTH),
    Matches(PASSWORD_DECORATOR.REGULAR, {
    message: PASSWORD_DECORATOR.MESSAGE
}))}