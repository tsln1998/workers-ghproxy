import {Context} from 'sunder';
import AllFilter from '../filters';
import * as _ from 'lodash';
/**
 * 代理控制器
 */
export class ProxyController {
  /**
   * 处理代理请求
   * @param {Context} ctx
   */
  async handle(ctx: Context) {
    const response = await ProxyController.request(ctx.url, ctx.request);

    // copy status code
    ctx.response.status = response.status;

    // copy headers
    _.forEach(Array.from(response.headers), ([key, value]) => {
      if (_.includes(['Content-Length'], _.lowerCase(key))) {
        return;
      }
      ctx.response.headers.set(key, value);
    });

    // copy modified body
    ctx.response.body = ProxyController.modify(
        await response.text(),
        ctx.url.searchParams
    );
  }

  /**
   * 修改并发送代理请求
   * @param {URL} url 原始 Url
   * @param {Request} origin 原始请求
   * @return {Promise<Response>}
   */
  static async request(url: URL, origin: Request): Promise<Response> {
    // rebuild url
    const targetUrl = new URL(_.replace(_.trimStart(url.pathname, '/'), /^(https?):\/\/?/, '$1://'));

    targetUrl.search = new URLSearchParams(
        _.filter<[key: string, value: string]>(
            Array.from(url.searchParams),
            ([key]) => !_.startsWith(key, '__')
        )
    ).toString();

    // rebuild request
    const request = new Request(
        AllFilter.convert(targetUrl.toString()),
        origin
    );

    // invoke request
    return await fetch(request);
  }

  /**
   * 按照请求参数修改响应内容
   * @param {string} text 原始响应内容
   * @param {URLSearchParams} params 原始请求参数
   * @return {string} 修改后的内容
   */
  static modify(text: string, params: URLSearchParams) {
    _.forOwn(
        JSON.parse(_.defaultTo(params.get('__replace'), '{}')),
        (to, from) => (text = text.replaceAll(from, to))
    );
    return text;
  }
}
