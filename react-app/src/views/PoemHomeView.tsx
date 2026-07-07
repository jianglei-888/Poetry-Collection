import { useCallback, useEffect, useState } from 'react';
import PoemManager from '@/api/PoemManager';
import { FeaturedPoemDto } from '@/api/AppDtos';
import PoemHomeCard from '@/components/poems/PoemHomeCard';
import PoemSceneShell from '@/components/poems/PoemSceneShell';
import { cn } from '@/lib/utils';

const featuredCardClasses = [
  'lg:col-start-2 lg:row-start-1 lg:translate-y-8',
  'lg:col-start-1 lg:row-start-2 lg:-translate-y-4 lg:translate-x-4',
  'lg:col-start-3 lg:row-start-2 lg:-translate-y-1 lg:-translate-x-6',
  'lg:col-start-2 lg:row-start-2 lg:translate-y-16 lg:translate-x-1',
  'lg:col-start-1 lg:row-start-3 lg:-translate-x-4 lg:-translate-y-5',
  'lg:col-start-3 lg:row-start-3 lg:translate-x-2 lg:translate-y-2',
  'lg:col-start-1 lg:row-start-1 lg:-translate-x-2 lg:translate-y-3',
  'lg:col-start-3 lg:row-start-1 lg:translate-x-3 lg:-translate-y-3',
  'lg:col-start-2 lg:row-start-3 lg:translate-y-3 lg:-translate-x-3',
];

const PoemHomeView = () => {
  const [poems, setPoems] = useState<FeaturedPoemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadPoems = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setLoadFailed(false);

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const result = await PoemManager.GetFeaturedPoems({}, { signal });
        setPoems(result.Poems);
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
          <header className="pt-2 text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.6em] text-[#f3e8cb]/90 drop-shadow-[0_0_10px_rgba(243,232,203,0.16)]">诗歌集</p>
          </header>

          <section className="mx-auto mt-8 max-w-6xl sm:mt-10 lg:mt-12">
            {isLoading ? (
              <div className="flex min-h-[24rem] items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 text-center text-[#e6edf8]/70 backdrop-blur-sm">
                精选诗歌正在缓缓显现……
              </div>
            ) : null}

            {!isLoading && loadFailed ? (
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
              <div className="relative flex items-center overflow-hidden rounded-[2.5rem] px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
                <div className="pointer-events-none absolute left-1/2 top-[22%] h-20 w-20 -translate-x-1/2 rounded-full bg-[#fff1c8]/[0.03] blur-3xl" />
                <div className="pointer-events-none absolute bottom-[14%] left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-[#fff0c6]/[0.08] blur-2xl" />

                <div className="relative z-10 grid w-full items-center gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:grid-rows-3 lg:gap-x-8 lg:gap-y-6">
                {poems.map((poem, index) => (
                  <PoemHomeCard
                    key={poem.PoemId}
                    poem={poem}
                    className={cn('justify-self-center px-6 py-4', featuredCardClasses[index % featuredCardClasses.length])}
                  />
                ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </PoemSceneShell>
  );
};

export default PoemHomeView;
