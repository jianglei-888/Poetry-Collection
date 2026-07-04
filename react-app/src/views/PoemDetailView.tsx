import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PoemManager from '@/api/PoemManager';
import { PoemDetailDto } from '@/api/AppDtos';
import PoemSceneShell from '@/components/poems/PoemSceneShell';

const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PoemDetailView = () => {
  const { poemId } = useParams<{ poemId: string }>();
  const [poem, setPoem] = useState<PoemDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPoem = async () => {
      if (!poemId) {
        setPoem(null);
        setIsLoading(false);
        return;
      }

      try {
        setLoadFailed(false);

        if (!guidPattern.test(poemId)) {
          setPoem(null);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const result = await PoemManager.GetPoemDetail({ PoemId: poemId }, { signal: controller.signal });
        setPoem(result);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadPoem();
    return () => controller.abort();
  }, [poemId]);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex min-h-[26rem] items-center justify-center rounded-[2rem] border border-white/12 bg-[#08111d]/55 px-6 text-center text-[#eef3ff]/72 shadow-[0_30px_120px_rgba(1,6,16,0.55)] backdrop-blur-xl">
          诗句正在夜色中缓缓浮现……
        </div>
      );
    }

    if (loadFailed) {
      return (
        <div className="rounded-[2rem] border border-white/12 bg-[#08111d]/55 px-8 py-14 text-center text-[#eef3ff]/74 shadow-[0_30px_120px_rgba(1,6,16,0.55)] backdrop-blur-xl">
          <p>这一页今夜未能抵达。</p>
          <Link className="mt-6 inline-flex text-sm tracking-[0.2em] text-[#f2e4c4]/82" to="/">
            返回首页
          </Link>
        </div>
      );
    }

    if (!poem) {
      return (
        <div className="rounded-[2rem] border border-white/12 bg-[#08111d]/55 px-8 py-14 text-center text-[#eef3ff]/74 shadow-[0_30px_120px_rgba(1,6,16,0.55)] backdrop-blur-xl">
          <p>这首诗暂时没有被找到。</p>
          <Link className="mt-6 inline-flex text-sm tracking-[0.2em] text-[#f2e4c4]/82" to="/">
            回到诗歌入口
          </Link>
        </div>
      );
    }

    return (
      <article className="relative overflow-hidden rounded-[2rem] border border-[#f4dfbf]/18 bg-[rgba(9,16,28,0.52)] px-6 py-8 shadow-[0_30px_120px_rgba(1,6,16,0.62)] backdrop-blur-xl sm:px-10 sm:py-10 lg:px-14 lg:py-14">
        {poem.IllustrationPath ? (
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 saturate-[0.95]"
            style={{ backgroundImage: `url(${poem.IllustrationPath})` }}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(8,15,25,0.05)_0%,rgba(8,15,25,0.35)_45%,rgba(8,15,25,0.65)_78%,rgba(8,15,25,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/5" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,244,219,0.07)_0%,rgba(255,244,219,0.02)_18%,rgba(8,15,25,0)_34%,rgba(8,15,25,0.16)_100%)]" />

        <Link
          to="/"
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-[#f6ead0]/82 transition hover:bg-white/[0.08] hover:text-[#fff8eb]"
          aria-label="返回首页"
        >
          ×
        </Link>

        <header className="relative text-center">
          <p className="text-sm tracking-[0.32em] text-[#efe2bf]/56">沉浸阅读</p>
          <h1 className="mt-5 text-3xl leading-tight text-[#fff9ee] sm:text-4xl lg:text-[2.9rem]">{poem.Title}</h1>
          <p className="mt-4 text-base tracking-[0.22em] text-[#dfe6f4]/70">{poem.Author}</p>
        </header>

        <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center text-lg leading-[2.25] text-[#f8f4ea]/88 sm:text-[1.35rem] sm:leading-[2.5]">
          {poem.Lines.map((line, index) => (
            <p
              key={`${index}-${line}`}
              className="animate-[poem-line-fade_1.2s_ease-out_forwards] opacity-0 transition duration-500 hover:text-[#fff8e8] hover:drop-shadow-[0_0_18px_rgba(255,244,214,0.42)]"
              style={{ animationDelay: `${index * 700}ms` }}
            >
              {line}
            </p>
          ))}
        </div>
      </article>
    );
  }, [isLoading, loadFailed, poem]);

  return (
    <PoemSceneShell>
      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="w-full max-w-5xl">{content}</div>
      </main>
    </PoemSceneShell>
  );
};

export default PoemDetailView;
