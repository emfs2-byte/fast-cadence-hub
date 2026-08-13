import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function LoadingState({ label = "carregando dados" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
      <Loader2 className="size-5 animate-spin text-primary" />
      <p className="mono-tag">{label}…</p>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface-card h-32 animate-pulse bg-muted/60" />
      ))}
    </div>
  );
}

export function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface-card h-16 animate-pulse bg-muted/60" />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
        {icon ?? <Inbox className="size-5" />}
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" />
      </span>
      <h3 className="text-base font-semibold text-foreground">Falha ao carregar</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mono-tag mt-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
        >
          tentar novamente
        </button>
      ) : null}
    </div>
  );
}
