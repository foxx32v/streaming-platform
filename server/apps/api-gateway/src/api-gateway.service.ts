import { Injectable } from '@nestjs/common';
import { ResponseDto } from './common/dto';
import { URL_CONFIG } from './common/configs';
import { AxiosRequest, Responser } from './common/helper';
@Injectable()
export class ApiGatewayService {
  async gateWay(targetUrl: string, method: string, headers: any, body, query): Promise<ResponseDto> {
    let serviceUrl: string = ''
    if (targetUrl.startsWith('/auth')) serviceUrl = `${URL_CONFIG.AUTH}`
    else if (targetUrl.startsWith('/users')) serviceUrl = `${URL_CONFIG.USERS}`
    else return Responser(404, 'Service not found.')
    const finalUrl = serviceUrl + targetUrl
    console.log(method,finalUrl)
    const res = await AxiosRequest(finalUrl, method, body, headers, query)
    return Responser(res.statusCode, res.message, res.data, res.errors)
  }
}
