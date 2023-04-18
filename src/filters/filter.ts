/**
 * Filter 过滤器定义
 * @function check 验证 Url 是否允许访问
 * @function convert 映射 Url (相当于本地跳转)
 */
export interface Filter {
  /**
   * @param {string} url 目标 Url
   * @return {boolean} Url 是否合法
   */
  check(url: string): boolean;

  /**
   * @param {string} url  目标Url
   * @return {string} 转换结果
   */
  convert(url: string): string;
}

/**
 * 基于正则的过滤器
 */
export class RegExpFilter implements Filter {
  private readonly regexp: RegExp;
  private readonly replacement: string | null;

  /**
   * @param {Regexp|string} regexp  用于匹配 Url 的正则
   * @param {string|null} replacement 替换模版
   */
  constructor(regexp: RegExp | string, replacement = null) {
    this.regexp = regexp instanceof RegExp ? regexp : new RegExp(regexp);
    this.replacement = replacement;
  }

  /**
   * @param {string} url 目标 Url
   * @return {boolean} Url 是否合法
   */
  check(url: string): boolean {
    return this.regexp.test(url);
  }

  /**
   * @param {string} url  目标Url
   * @return {string} 转换结果
   */
  convert(url: string): string {
    if (this.replacement == null) {
      return url;
    }
    return url.replaceAll(this.regexp, this.replacement);
  }
}

/**
 * 合并过滤器
 */
export class CombineFilter implements Filter {
  private readonly filters: Filter[];

  /**
   * @param {Filter[]} 过滤器集合
   */
  constructor(...filters: Filter[]) {
    this.filters = filters;
  }

  /**
   * @param {string} url 目标 Url
   * @return {boolean} Url 是否合法
   */
  check(url: string): boolean {
    return this.pick(url) != null;
  }

  /**
   * @param {string} url  目标Url
   * @return {string} 转换结果
   */
  convert(url: string): string {
    return this.pick(url)?.convert(url) ?? url;
  }

  /**
   * @param {string} url 目标 Url
   * @return {Filter|null} 支持转换目标 Url 的过滤器
   */
  private pick(url: string): Filter | null {
    for (const filter of this.filters) {
      if (filter.check(url)) {
        return filter;
      }
    }
    return null;
  }
}
