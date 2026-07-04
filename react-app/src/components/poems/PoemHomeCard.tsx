import { Link } from 'react-router-dom';
import { FeaturedPoemDto } from '@/api/AppDtos';
import { cn } from '@/lib/utils';

interface PoemHomeCardProps {
  poem: FeaturedPoemDto;
  className?: string;
}

const PoemHomeCard = ({ poem, className }: PoemHomeCardProps) => {
  return (
    <Link
      to={`/poems/${poem.PoemId}`}
      className={cn(
        'group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2e4c4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]',
        className
      )}
    >
      <article className="relative animate-[poem-float_8s_ease-in-out_infinite] px-4 py-3 transition duration-700 ease-out group-hover:scale-[1.07]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,244,219,0.18)_0%,rgba(255,244,219,0.07)_24%,transparent_72%)] opacity-75 blur-xl transition duration-700 group-hover:opacity-100" />
        <div className="relative">
          <h2 className="animate-[poem-glow_6.5s_ease-in-out_infinite] whitespace-nowrap text-[clamp(1.25rem,2.4vw,1.65rem)] leading-tight text-[#fffaf0]/96 drop-shadow-[0_0_18px_rgba(255,245,227,0.36)] transition duration-700 group-hover:text-white group-hover:drop-shadow-[0_0_30px_rgba(255,244,214,0.7)]">
            《{poem.Title}》
          </h2>
          <p className="mt-2 animate-[poem-glow_7.4s_ease-in-out_infinite] text-[0.88rem] tracking-[0.2em] text-[#efe2bf]/82 transition duration-700 group-hover:translate-y-0.5 group-hover:text-[#fff0cf]/96 sm:text-[0.95rem]">
            {poem.Author}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default PoemHomeCard;
