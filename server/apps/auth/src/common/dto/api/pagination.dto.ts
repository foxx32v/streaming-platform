import { IsPage, IsLimit } from '../../decorators';

export class PaginationDto {
    @IsPage()
    'page': number
    @IsLimit()
    'limit': number
}