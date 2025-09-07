'use client';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export default function Skeleton({ 
  className = '', 
  lines = 1, 
  height = 'h-4' 
}: SkeletonProps) {
  if (lines === 1) {
    return (
      <div 
        className={`skeleton rounded ${height} ${className}`}
        aria-label="Carregando..."
      />
    );
  }

  return (
    <div className="space-y-3" aria-label="Carregando...">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`skeleton rounded ${height} ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          } ${className}`}
        />
      ))}
    </div>
  );
}

// Componentes específicos de skeleton
export function CardSkeleton() {
  return (
    <div className="p-6 border border-zinc-800 rounded-xl space-y-4">
      <div className="skeleton h-12 w-12 rounded-lg" />
      <div className="space-y-2">
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <article className="p-6 border border-zinc-800 rounded-xl space-y-4">
      <div className="skeleton h-48 w-full rounded-lg" />
      <div className="space-y-3">
        <div className="skeleton h-4 w-1/4 rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </article>
  );
}

export function HeroSkeleton() {
  return (
    <div className="text-center space-y-8 py-16">
      <div className="space-y-4">
        <div className="skeleton h-12 w-96 mx-auto rounded" />
        <div className="skeleton h-6 w-2/3 mx-auto rounded" />
      </div>
      <div className="flex gap-4 justify-center">
        <div className="skeleton h-12 w-32 rounded-xl" />
        <div className="skeleton h-12 w-32 rounded-xl" />
      </div>
    </div>
  );
}
