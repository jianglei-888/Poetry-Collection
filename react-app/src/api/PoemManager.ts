import { GetFeaturedPoemsRequestDto, FeaturedPoemDto, FeaturedPoemListDto, GetPoemDetailRequestDto, PoemDetailDto } from "./AppDtos";
import ApiClient, { ApiClientRequestOptions } from "./ApiClient";

const GetFeaturedPoems = (request: GetFeaturedPoemsRequestDto, options?: ApiClientRequestOptions): Promise<FeaturedPoemListDto> =>
  ApiClient.invokeMethod<FeaturedPoemListDto>("Api", "PoemManager", "GetFeaturedPoems", request, options);

const GetPoemDetail = (request: GetPoemDetailRequestDto, options?: ApiClientRequestOptions): Promise<PoemDetailDto | null> =>
  ApiClient.invokeMethod<PoemDetailDto | null>("Api", "PoemManager", "GetPoemDetail", request, options);

// SPA 内存缓存：让 PoemHomeView / PoemDetailView 共享一份精选列表
// 用途: 详情页首屏可立刻拿到 Title/Author/IllustrationPath,
// 避免路由切换瞬间出现 "夜色中缓缓浮现……" 26rem 大占位卡
let featuredCache: FeaturedPoemDto[] | null = null;

export const getFeaturedCache = (): FeaturedPoemDto[] | null => featuredCache;

export const setFeaturedCache = (list: FeaturedPoemDto[]): void => {
  featuredCache = list;
};

// 详情预取缓存: hover 卡片时触发 GetPoemDetail, 结果存这里
// 详情页 mount 时如果命中, lines 就位, article 容器首帧就是完整诗,
// 不会停在 "标题已渲染 + 诗槽空" 的残缺小卡片状态
let detailCache: Map<string, PoemDetailDto> = new Map();
const inflightDetail: Map<string, Promise<PoemDetailDto | null>> = new Map();

export const getDetailCache = (poemId: string): PoemDetailDto | undefined => detailCache.get(poemId);

const setDetailCache = (poemId: string, detail: PoemDetailDto): void => {
  detailCache.set(poemId, detail);
};

// prefetch: 多个 hover 触发只发一次请求; 失败静默 (详情页自己还会重发)
export const prefetchPoemDetail = (poemId: string): void => {
  if (detailCache.has(poemId) || inflightDetail.has(poemId)) return;
  const promise = GetPoemDetail({ PoemId: poemId })
    .then(result => {
      inflightDetail.delete(poemId);
      if (result) setDetailCache(poemId, result);
      return result;
    })
    .catch(() => {
      inflightDetail.delete(poemId);
      return null;
    });
  inflightDetail.set(poemId, promise);
};

export default {
  GetFeaturedPoems,
  GetPoemDetail,
  getFeaturedCache,
  setFeaturedCache,
  getDetailCache,
  prefetchPoemDetail,
};
