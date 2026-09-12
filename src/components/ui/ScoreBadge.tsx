import { cn } from '@/lib/utils';
import { TrendingUp, Award } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  potentialScore?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({
  score,
  potentialScore,
  className,
  size = 'md',
}: ScoreBadgeProps) {
  const formattedScore = score.toFixed(1).replace('.', ',');
  const formattedPotential = potentialScore
    ? potentialScore.toFixed(1).replace('.', ',')
    : null;

  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2', className)}>
      {/* Current Presentation Score */}
      <div className="flex flex-col justify-between rounded-xl bg-zinc-950 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Award className="h-4 w-4 text-zinc-300" />
          <span>Apresentação Atual</span>
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            {formattedScore}
          </span>
          <span className="text-sm font-medium text-zinc-500">/ 10</span>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Baseada na sua rotina e cuidados atuais
        </p>
      </div>

      {/* Potential Evolution Score */}
      {formattedPotential && (
        <div className="flex flex-col justify-between rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700/80 p-4 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <TrendingUp className="h-4 w-4 text-white" />
            <span>Potencial de Evolução</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              {formattedPotential}
            </span>
            <span className="text-sm font-medium text-zinc-400">/ 10</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            Alcançável com consistência e grooming
          </p>
        </div>
      )}
    </div>
  );
}
