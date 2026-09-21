import { IsPage, IsLimit } from '../../urils';

export class PaginationDto {
    @IsPage()
    'page': number
    @IsLimit()
    'limit': number
}