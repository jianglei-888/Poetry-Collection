import { Link } from 'react-router-dom';
import { FeaturedPoemDto } from '@/api/AppDtos';
import PoemManager from '@/api/PoemManager';
import { cn } from '@/lib/utils';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';
type CardVisibility = 'faint' | 'soft' | 'clear' | 'hero';

interface PoemHomeCardProps {
  poem: FeaturedPoemDto;
  className?: string;
  sizeVariant?: CardSize;
  visibility?: CardVisibility;
}

const sizeStyles: Record<CardSize, { title: string; author: string; padding: string }> = {
  sm: {
    title: 'text-[clamp(0.78rem,1.05vw,0.95rem)] drop-shadow-[0_0_10px_rgba(255,245,227,0.22)] group-hover:drop-shadow-[0_0_18px_rgba(255,244,214,0.5)]',
    author: 'text-[0.62rem] sm:text-[0.68rem]',
    padding: 'px-3 py-1.5',
  },
  md: {
    title: 'text-[clamp(0.95rem,1.5vw,1.15rem)] drop-shadow-[0_0_12px_rgba(255,245,227,0.28)] group-hover:drop-shadow-[0_0_22px_rgba(255,244,214,0.58)]',
    author: 'text-[0.7rem] sm:text-[0.78rem]',
    padding: 'px-4 py-2',
  },
  lg: {
    title: 'text-[clamp(1.2rem,1.95vw,1.55rem)] drop-shadow-[0_0_16px_rgba(255,245,227,0.38)] group-hover:drop-shadow-[0_0_28px_rgba(255,244,214,0.68)]',
    author: 'text-[0.78rem] sm:text-[0.85rem]',
    padding: 'px-5 py-2.5',
  },
  xl: {
    title: 'text-[clamp(1.7rem,3.2vw,2.6rem)] drop-shadow-[0_0_22px_rgba(255,245,227,0.5)] group-hover:drop-shadow-[0_0_36px_rgba(255,244,214,0.78)]',
    author: 'text-[0.9rem] sm:text-[1rem]',
    padding: 'px-6 py-3',
  },
};

// 4 档可见度:夜空浸入感 — faint 微光 / soft 较亮 / clear 清晰 / hero 主诗
const visibilityStyles: Record<CardVisibility, { base: string; hover: string }> = {
  faint: {
    base: 'opacity-55',
    hover: 'group-hover:opacity-100',
  },
  soft: {
    base: 'opacity-70',
    hover: 'group-hover:opacity-100',
  },
  clear: {
    base: 'opacity-90',
    hover: 'group-hover:opacity-100',
  },
  hero: {
    base: 'opacity-100',
    hover: 'group-hover:opacity-100',
  },
};

const PoemHomeCard = ({
  poem,
  className,
  sizeVariant = 'md',
  visibility = 'clear',
}: PoemHomeCardProps) => {
  const styles = sizeStyles[sizeVariant];
  const vis = visibilityStyles[visibility];

  // 鼠标进入/键盘聚焦时预取详情 — 详情页 mount 时 lines 已就位,
  // article 容器首帧就是完整诗, 不会停在 "标题已渲染 + 诗槽空" 的残缺小卡片状态
  const handlePrefetch = () => {
    PoemManager.prefetchPoemDetail(poem.PoemId);
  };

  return (
    <Link
      to={`/poems/${poem.PoemId}`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      className={cn(
        'group block text-center transition-opacity duration-1000 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2e4c4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]',
        vis.base,
        vis.hover,
        className
      )}
    >
      <article className={cn('relative animate-[poem-float_8s_ease-in-out_infinite] transition duration-700 ease-out group-hover:scale-[1.07]', styles.padding)}>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,244,219,0.18)_0%,rgba(255,244,219,0.07)_24%,transparent_72%)] opacity-75 blur-xl transition duration-700 group-hover:opacity-100" />
        <div className="relative">
          <h2 className={cn('animate-[poem-glow_6.5s_ease-in-out_infinite] whitespace-nowrap leading-tight text-[#fffaf0]/96 transition duration-700 group-hover:text-white', styles.title)}>
            《{poem.Title}》
          </h2>
          <p className={cn('mt-1.5 animate-[poem-glow_7.4s_ease-in-out_infinite] tracking-[0.2em] text-[#efe2bf]/82 transition duration-700 group-hover:translate-y-0.5 group-hover:text-[#fff0cf]/96', styles.author)}>
            {poem.Author}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default PoemHomeCard;