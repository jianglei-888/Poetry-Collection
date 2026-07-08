import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PoemManager, { getDetailCache, getFeaturedCache } from '@/api/PoemManager';
import { FeaturedPoemDto } from '@/api/AppDtos';
import PoemSceneShell from '@/components/poems/PoemSceneShell';

const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PoemDetailView = () => {
  const { poemId } = useParams<{ poemId: string }>();
  // 详情 prefetch 命中 (鼠标 hover 过卡片) → seed 和 lines 都立刻就位,
  // article 容器首帧就是完整诗, 没有 "标题已渲染 + 诗槽空" 的残缺小卡片状态
  const initialDetail = poemId ? getDetailCache(poemId) : undefined;
  // seed: 标题/作者/插图 — 优先从首页缓存取, 首屏立刻可用
  const [seed, setSeed] = useState<FeaturedPoemDto | null>(() => {
    if (!poemId || !guidPattern.test(poemId)) return null;
    if (initialDetail) {
      return {
        PoemId: initialDetail.PoemId,
        Title: initialDetail.Title,
        Author: initialDetail.Author,
        IllustrationPath: initialDetail.IllustrationPath,
        FeaturedOrder: 0,
      };
    }
    return getFeaturedCache()?.find(p => p.PoemId === poemId) ?? null;
  });
  // lines: 诗句 — 优先从 detailCache 取 (prefetch 命中), 否则等 GetPoemDetail
  const [lines, setLines] = useState<string[] | null>(initialDetail?.Lines ?? null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPoem = async () => {
      if (!poemId) {
        setLoadFailed(true);
        return;
      }

      if (!guidPattern.test(poemId)) {
        setSeed(null);
        setLoadFailed(true);
        return;
      }

      // seed 已在 useState 初始化中拿过; poemId 变化时再从 cache 重取一次 (无网络)
      setSeed(getFeaturedCache()?.find(p => p.PoemId === poemId) ?? null);
      setLoadFailed(false);

      try {
        const result = await PoemManager.GetPoemDetail({ PoemId: poemId }, { signal: controller.signal });
        if (controller.signal.aborted) return;

        if (result) {
          // 详情接口也带 Title/Author/IllustrationPath — 用于补 seed (深链 / cache miss 场景)
          setSeed({
            PoemId: result.PoemId,
            Title: result.Title,
            Author: result.Author,
            IllustrationPath: result.IllustrationPath,
            FeaturedOrder: 0,
          });
          setLines(result.Lines);
        } else {
          setLoadFailed(true);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadFailed(true);
        }
      }
    };

    void loadPoem();
    return () => controller.abort();
  }, [poemId]);

  const content = useMemo(() => {
    // 0) 加载失败 — 错误页 (深链 / API 报错)
    if (loadFailed && !lines) {
      return (
        <div className="rounded-[2rem] border border-white/12 bg-[#08111d]/55 px-8 py-14 text-center text-[#eef3ff]/74 shadow-[0_30px_120px_rgba(1,6,16,0.55)] backdrop-blur-xl">
          <p>这一页今夜未能抵达。</p>
          <Link className="mt-6 inline-flex text-sm tracking-[0.2em] text-[#f2e4c4]/82" to="/">
            返回首页
          </Link>
        </div>
      );
    }

    // 1) seed 拿不到 (冷启动竞态 / 深链) — 仍然渲 article 容器, 标题/作者留空,
    //    诗槽空; 请求回来时由 useEffect 直接 setSeed 触发 article 内容替换, 不存在 "一帧大块被替换"
    const display = seed ?? {
      PoemId: poemId ?? '',
      Title: '',
      Author: '',
      IllustrationPath: '',
      FeaturedOrder: 0,
    } as FeaturedPoemDto;

    return (
      <article className="relative overflow-hidden rounded-[2rem] border border-[#f4dfbf]/18 bg-[rgba(9,16,28,0.52)] px-6 py-8 shadow-[0_30px_120px_rgba(1,6,16,0.62)] backdrop-blur-xl sm:px-10 sm:py-10 lg:px-14 lg:py-14">
        {display.IllustrationPath ? (
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 saturate-[0.95]"
            style={{ backgroundImage: `url(${display.IllustrationPath})` }}
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
          <h1 className="mt-5 text-3xl leading-tight text-[#fff9ee] sm:text-4xl lg:text-[2.9rem]">{display.Title}</h1>
          <p className="mt-4 text-base tracking-[0.22em] text-[#dfe6f4]/70">{display.Author}</p>
        </header>

        <div className="relative mx-auto mt-12 flex w-full max-w-3xl flex-col items-center gap-5 text-center text-lg leading-[2.25] text-[#f8f4ea]/88 sm:text-[1.35rem] sm:leading-[2.5]">
          {lines === null ? null : lines.map((line, index) => (
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
  }, [seed, lines, loadFailed, poemId]);

  return (
    <PoemSceneShell>
      <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="w-full max-w-5xl">{content}</div>
      </main>
    </PoemSceneShell>
  );
};

export default PoemDetailView;
