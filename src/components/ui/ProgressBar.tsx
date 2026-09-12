import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{label}</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
        <div
          className={cn(
            'h-full bg-white transition-all duration-500 ease-out rounded-full',
            barClassName
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
