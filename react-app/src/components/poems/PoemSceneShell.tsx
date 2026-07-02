import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PoemSceneShellProps {
  illustrationPath?: string | null;
  children: ReactNode;
  className?: string;
  backgroundImagePath?: string;
}

const PoemSceneShell = ({ illustrationPath, children, className, backgroundImagePath }: PoemSceneShellProps) => {
  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden bg-[#07111f] text-[#f4efe3]',
        backgroundImagePath
          ? 'before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,_rgba(3,7,16,0.02)_0%,_rgba(3,7,16,0.08)_54%,_rgba(3,7,16,0.18)_100%)] before:content-[""]'
          : 'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_18%,_rgba(118,160,220,0.1),_transparent_28%),linear-gradient(180deg,_rgba(5,10,20,0.16)_0%,_rgba(5,10,20,0.34)_48%,_rgba(4,8,16,0.62)_100%)] before:content-[""]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        {backgroundImagePath ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: `url(${backgroundImagePath})` }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,16,0)_0%,rgba(3,7,16,0.02)_38%,rgba(3,7,16,0.1)_72%,rgba(3,7,16,0.22)_100%)]" />
          </>
        ) : null}

        {backgroundImagePath ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.12)_0,transparent_0.14rem),radial-gradient(circle_at_68%_28%,rgba(255,255,255,0.08)_0,transparent_0.12rem),radial-gradient(circle_at_48%_72%,rgba(255,255,255,0.08)_0,transparent_0.14rem),radial-gradient(circle_at_82%_62%,rgba(255,255,255,0.08)_0,transparent_0.12rem)] bg-[length:22rem_22rem] opacity-20" />
            <div className="absolute inset-0 animate-[star-drift_36s_linear_infinite] bg-[radial-gradient(circle_at_22%_25%,rgba(255,245,223,0.18)_0,transparent_0.24rem),radial-gradient(circle_at_61%_20%,rgba(255,245,223,0.14)_0,transparent_0.2rem),radial-gradient(circle_at_76%_49%,rgba(255,245,223,0.16)_0,transparent_0.24rem),radial-gradient(circle_at_34%_66%,rgba(255,245,223,0.12)_0,transparent_0.2rem)] opacity-18 blur-[0.5px]" />
            <div className="absolute left-[16%] top-[24%] h-1.5 w-1.5 animate-[star-pulse_6.8s_ease-in-out_infinite] rounded-full bg-[#fff4d4]/68 shadow-[0_0_10px_rgba(255,244,212,0.18)]" />
            <div className="absolute left-[29%] top-[48%] h-2 w-2 animate-[star-pulse_7.6s_ease-in-out_infinite_1.2s] rounded-full bg-[#fff1c9]/62 shadow-[0_0_12px_rgba(255,244,212,0.16)]" />
            <div className="absolute left-[69%] top-[32%] h-1.5 w-1.5 animate-[star-pulse_7.4s_ease-in-out_infinite_0.6s] rounded-full bg-[#fff5de]/62 shadow-[0_0_10px_rgba(255,244,212,0.14)]" />
            <div className="absolute left-[77%] top-[61%] h-2 w-2 animate-[star-pulse_8.2s_ease-in-out_infinite_1.4s] rounded-full bg-[#fff0c1]/62 shadow-[0_0_12px_rgba(255,244,212,0.16)]" />
            <div className="absolute left-[44%] top-[71%] h-1.5 w-1.5 animate-[star-pulse_7.1s_ease-in-out_infinite_1.8s] rounded-full bg-[#fff5dc]/60 shadow-[0_0_10px_rgba(255,244,212,0.14)]" />
            <div className="absolute inset-x-0 bottom-[2%] h-[14vh] bg-[radial-gradient(circle_at_50%_72%,rgba(255,229,154,0.22),rgba(255,229,154,0.08)_18%,transparent_56%)]" />
            <div className="absolute inset-x-0 bottom-[-1rem] h-[16vh] bg-[radial-gradient(ellipse_at_center,rgba(255,239,186,0.08)_0%,rgba(255,239,186,0.03)_28%,transparent_72%)] blur-2xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.54)_0,transparent_0.12rem),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.32)_0,transparent_0.1rem),radial-gradient(circle_at_40%_75%,rgba(255,255,255,0.28)_0,transparent_0.12rem),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.24)_0,transparent_0.1rem),radial-gradient(circle_at_28%_48%,rgba(255,255,255,0.22)_0,transparent_0.1rem),radial-gradient(circle_at_58%_58%,rgba(255,255,255,0.2)_0,transparent_0.1rem)] bg-[length:18rem_18rem] opacity-38" />
            <div className="absolute inset-0 animate-[star-drift_28s_linear_infinite] bg-[radial-gradient(circle_at_20%_26%,rgba(255,245,223,0.5)_0,transparent_0.28rem),radial-gradient(circle_at_63%_18%,rgba(255,245,223,0.38)_0,transparent_0.22rem),radial-gradient(circle_at_77%_52%,rgba(255,245,223,0.44)_0,transparent_0.3rem),radial-gradient(circle_at_34%_63%,rgba(255,245,223,0.34)_0,transparent_0.24rem),radial-gradient(circle_at_58%_73%,rgba(255,245,223,0.32)_0,transparent_0.26rem),radial-gradient(circle_at_86%_34%,rgba(255,245,223,0.32)_0,transparent_0.22rem)] opacity-38 blur-[1px]" />
            <div className="absolute inset-0 animate-[star-pulse_7s_ease-in-out_infinite] bg-[radial-gradient(circle_at_22%_24%,rgba(255,247,230,0.16)_0,transparent_1.8rem),radial-gradient(circle_at_61%_20%,rgba(255,247,230,0.12)_0,transparent_1.4rem),radial-gradient(circle_at_74%_48%,rgba(255,247,230,0.12)_0,transparent_1.6rem),radial-gradient(circle_at_30%_66%,rgba(255,247,230,0.1)_0,transparent_1.3rem),radial-gradient(circle_at_54%_76%,rgba(255,247,230,0.1)_0,transparent_1.2rem)] opacity-34" />
          </>
        )}

        {illustrationPath && !backgroundImagePath ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-26 blur-[2px] saturate-[0.94]"
              style={{ backgroundImage: `url(${illustrationPath})` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,16,0.18)_0%,rgba(3,7,16,0.34)_26%,rgba(3,7,16,0.58)_60%,rgba(3,7,16,0.88)_100%)]" />
          </>
        ) : null}
        {backgroundImagePath ? null : (
          <>
            <div className="absolute left-[14%] top-[20%] h-1.5 w-1.5 animate-[star-pulse_5.8s_ease-in-out_infinite] rounded-full bg-[#fff4d4]/75 shadow-[0_0_10px_rgba(255,244,212,0.2)]" />
            <div className="absolute left-[26%] top-[42%] h-2 w-2 animate-[star-pulse_6.4s_ease-in-out_infinite_1.4s] rounded-full bg-[#fff1c9]/72 shadow-[0_0_12px_rgba(255,244,212,0.18)]" />
            <div className="absolute left-[68%] top-[30%] h-1.5 w-1.5 animate-[star-pulse_7.2s_ease-in-out_infinite_0.8s] rounded-full bg-[#fff5de]/70 shadow-[0_0_10px_rgba(255,244,212,0.16)]" />
            <div className="absolute left-[76%] top-[62%] h-2.5 w-2.5 animate-[star-pulse_6.7s_ease-in-out_infinite_1.1s] rounded-full bg-[#fff0c1]/72 shadow-[0_0_14px_rgba(255,244,212,0.18)]" />
            <div className="absolute left-[42%] top-[68%] h-1.5 w-1.5 animate-[star-pulse_6.1s_ease-in-out_infinite_1.8s] rounded-full bg-[#fff5dc]/70 shadow-[0_0_10px_rgba(255,244,212,0.16)]" />
            <div className="absolute inset-x-0 bottom-0 h-[24vh] bg-[radial-gradient(circle_at_50%_100%,rgba(249,228,164,0.22),rgba(249,228,164,0.08)_18%,transparent_52%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[14vh] bg-[linear-gradient(180deg,transparent_0%,rgba(8,15,27,0.04)_36%,rgba(8,15,27,0.24)_100%)]" />
            <div className="absolute inset-x-0 bottom-[-2rem] h-[12vh] bg-[radial-gradient(ellipse_at_center,rgba(113,135,164,0.12)_0%,rgba(30,42,63,0.06)_34%,transparent_72%)] blur-3xl" />
          </>
        )}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PoemSceneShell;
