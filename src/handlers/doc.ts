import {Context} from 'sunder';

/**
 * 首页控制器
 */
export class DocController {
  /**
   * @param {Context} ctx
   */
  Index(ctx: Context) {
    ctx.response.body = 'Hello Workers';
  }
}
