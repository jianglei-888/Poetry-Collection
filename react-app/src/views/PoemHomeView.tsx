import { useCallback, useEffect, useState } from 'react';
import PoemManager, { getFeaturedCache, setFeaturedCache } from '@/api/PoemManager';
import { FeaturedPoemDto } from '@/api/AppDtos';
import PoemHomeCard from '@/components/poems/PoemHomeCard';
import PoemSceneShell from '@/components/poems/PoemSceneShell';
import { cn } from '@/lib/utils';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';
type CardVisibility = 'faint' | 'soft' | 'clear' | 'hero';

interface CardPlacement {
  position: string;       // Tailwind absolute 定位类,仅 lg 生效
  size: CardSize;
  visibility: CardVisibility;
}

// 顺序:精选 1-13
// 核心概念:"夜空浸入" — 不是均匀分布,而是主诗+次主诗清楚、其余 10 首隐入夜空
//   1 首 hero(主诗) + 2 首 clear(次主诗) + 2 首 soft(微光) + 8 首 faint(几乎隐入)
// 主诗《春江花月夜》在人物头部水平 y=35% — 视线第一落点
// 2 首次主诗(水调歌头/月下独酌)在画面上 1/3 左右
// 8 首 faint 像"夜空里的微光",hover 时浮现到 90%
//
// 精选序(后端 FeaturedOrder):
//   1 月下独酌 / 2 春江花月夜 / 3 青玉案·元夕 / 4 静夜思 / 5 水调歌头·明月几时有
//   6 枫桥夜泊 / 7 望庐山瀑布 / 8 江雪 / 9 念奴娇·赤壁怀古 / 10 登鹳雀楼
//   11 天净沙·秋思 / 12 小池 / 13 九月九日忆山东兄弟
//
// "夜空浸入"分配:
//   hero(1 首)      = 2《春江花月夜》主诗
//   clear(2 首)     = 1《月下独酌》+ 5《水调歌头》次主诗
//   soft(2 首)      = 3《青玉案·元夕》+ 7《望庐山瀑布》微光
//   faint(8 首)     = 4/6/8/9/10/11/12/13 几乎隐入
const featuredCardPlacements: CardPlacement[] = [
  { position: 'lg:absolute lg:top-[20%] lg:left-[12%]', size: 'lg', visibility: 'clear' },         // 1 月下独酌(次主诗)
  { position: 'lg:absolute lg:top-[10%] lg:left-1/2 lg:-translate-x-1/2', size: 'lg', visibility: 'hero' }, // 2 春江花月夜(主诗 ★,画面正中,人物正上方)
  { position: 'lg:absolute lg:top-[12%] lg:right-[8%]', size: 'sm', visibility: 'soft' },         // 3 青玉案·元夕(微光)
  { position: 'lg:absolute lg:top-[8%] lg:left-[6%]', size: 'sm', visibility: 'faint' },           // 4 静夜思(隐入)
  { position: 'lg:absolute lg:top-[28%] lg:right-[18%]', size: 'lg', visibility: 'clear' },       // 5 水调歌头·明月几时有(次主诗)
  { position: 'lg:absolute lg:top-[24%] lg:left-[32%]', size: 'sm', visibility: 'faint' },        // 6 枫桥夜泊(隐入)
  { position: 'lg:absolute lg:top-[28%] lg:left-[4%]', size: 'sm', visibility: 'soft' },          // 7 望庐山瀑布(微光)
  { position: 'lg:absolute lg:top-[30%] lg:right-[6%]', size: 'sm', visibility: 'faint' },        // 8 江雪(隐入)
  { position: 'lg:absolute lg:top-[40%] lg:left-[20%]', size: 'sm', visibility: 'faint' },        // 9 念奴娇·赤壁怀古(隐入)
  { position: 'lg:absolute lg:top-[42%] lg:right-[33%] lg:-translate-x-1/2', size: 'sm', visibility: 'faint' }, // 10 登鹳雀楼(隐入)
  { position: 'lg:absolute lg:top-[44%] lg:right-[20%]', size: 'sm', visibility: 'faint' },       // 11 天净沙·秋思(隐入)
  { position: 'lg:absolute lg:top-[45%] lg:left-[38%]', size: 'sm', visibility: 'faint' },        // 12 小池(隐入)
  { position: 'lg:absolute lg:top-[49%] lg:right-[4%]', size: 'sm', visibility: 'faint' },        // 13 九月九日忆山东兄弟(隐入)
];

const PoemHomeView = () => {
  // 缓存先行: 详情→返回首页时, 列表数据从内存缓存立刻拿到, 不再先闪 loading 占位卡
  const [poems, setPoems] = useState<FeaturedPoemDto[]>(() => getFeaturedCache() ?? []);
  // 有缓存命中时不算 loading (poems 已就位, 后台静默刷新即可)
  const [isLoading, setIsLoading] = useState<boolean>(() => (getFeaturedCache() ?? []).length === 0);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadPoems = useCallback(async (signal?: AbortSignal) => {
    // 仅在 "poems 为空 (无缓存命中)" 时显示 loading; 缓存先行场景下静默刷新
    if ((getFeaturedCache() ?? []).length === 0) {
      setIsLoading(true);
    }
    setLoadFailed(false);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const result = await PoemManager.GetFeaturedPoems({}, { signal });
        setPoems(result.Poems);
        setFeaturedCache(result.Poems);
        setLoadFailed(false);
        setIsLoading(false);
        return;
      } catch (error) {
        if (signal?.aborted) {
          return;
        }

        if (attempt < 2) {
          await new Promise(resolve => window.setTimeout(resolve, 900));
          continue;
        }

        setLoadFailed(true);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void loadPoems(controller.signal);
    return () => controller.abort();
  }, [loadPoems]);

  const handleRetry = () => {
    void loadPoems();
  };

  return (
    <PoemSceneShell illustrationPath={poems[0]?.IllustrationPath} backgroundImagePath="/poems/home.png">
      <main className="min-h-screen px-6 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="pt-2 text-center lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f2e4c4]/25 bg-[#08111d]/55 px-5 py-1.5 text-[0.7rem] uppercase tracking-[0.5em] text-[#f3e8cb]/95 shadow-[0_0_22px_rgba(243,232,203,0.18)] backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-[#f3e8cb]/80 shadow-[0_0_8px_rgba(243,232,203,0.7)]" />
              诗歌集
            </span>
          </header>

          <section className="mx-auto mt-8 max-w-6xl sm:mt-10 lg:mt-12">
            {isLoading ? (
              <div className="flex min-h-[24rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 text-center text-[#e6edf8]/70 backdrop-blur-sm">
                精选诗歌正在缓缓显现……
              </div>
            ) : null}

            {/* 仅当 poems 也为空 (无缓存兜底) 时才显示错误页; 缓存命中时静默失败, 继续展示列表 */}
            {!isLoading && loadFailed && poems.length === 0 ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 text-center text-[#e6edf8]/72 backdrop-blur-sm">
                <p>今夜的诗页暂时没有展开，请稍后再来。</p>
                <button
                  className="mt-6 rounded-full border border-[#f2e4c4]/25 bg-white/[0.05] px-5 py-2 text-sm text-[#f7edd8] transition hover:bg-white/[0.1]"
                  onClick={handleRetry}
                >
                  重新展开诗页
                </button>
              </div>
            ) : null}

            {!isLoading && !loadFailed && poems.length === 0 ? (
              <div className="flex min-h-[24rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 text-center text-[#e6edf8]/72 backdrop-blur-sm">
                今晚首页还没有被点亮的诗歌。
              </div>
            ) : null}

            {!isLoading && !loadFailed && poems.length > 0 ? (
              <div className="relative grid w-full grid-cols-2 gap-y-8 gap-x-6 px-4 py-6 sm:px-6 sm:py-8 lg:block lg:h-[calc(100vh-8rem)] lg:gap-0 lg:px-12 lg:py-8">
                <div className="pointer-events-none absolute left-1/2 top-[22%] h-20 w-20 -translate-x-1/2 rounded-full bg-[#fff1c8]/[0.03] blur-3xl" />
                <div className="pointer-events-none absolute bottom-[14%] left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-[#fff0c6]/[0.08] blur-2xl" />

                {poems.slice(0, featuredCardPlacements.length).map((poem, index) => {
                  const placement = featuredCardPlacements[index];
                  if (!placement) return null;
                  return (
                    <PoemHomeCard
                      key={poem.PoemId}
                      poem={poem}
                      sizeVariant={placement.size}
                      visibility={placement.visibility}
                      className={cn(
                        'justify-self-center',
                        placement.position
                      )}
                    />
                  );
                })}
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </PoemSceneShell>
  );
};

export default PoemHomeView;