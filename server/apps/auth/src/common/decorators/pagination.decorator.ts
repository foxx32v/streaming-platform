import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { PAGINATION_CONFIG } from '../config/pagination.config'

export function IsPage() {
    return applyDecorators(
        IsOptional(),
        IsNumber(),
        Min(PAGINATION_CONFIG.MIN_PAGE)
)}

export function IsLimit() {
    return applyDecorators(
        IsOptional(),
        IsNumber(),
        Min(PAGINATION_CONFIG.MIN_LIMIT),
        Max(PAGINATION_CONFIG.MAX_LIMIT)
)}