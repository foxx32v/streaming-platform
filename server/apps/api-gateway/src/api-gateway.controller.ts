import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ResponseDto } from './common/dto';
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}
  // Dev //
  @Get('ping')
  async ping(@Res() res: any) {
    return res.status(200).json({message: 'ok'})
  }
  // All routs //
  @All('*')
  async gateWay(@Req() req: any, @Res() res: any) {
    const { method, headers, body, query, originalUrl } = req;
    const result: ResponseDto = await this.apiGatewayService.gateWay(originalUrl, method, headers, body, query);
    return res.status(result.statusCode || 200).json(result)
  }
}
