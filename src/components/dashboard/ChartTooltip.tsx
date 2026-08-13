interface TooltipPayloadItem {
  name?: string | number;
  value?: string | number;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  sufixo?: string;
  titleKey?: string;
}

export function ChartTooltip({ active, payload, label, sufixo, titleKey }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const titulo =
    titleKey && item?.payload && typeof item.payload[titleKey] === "string"
      ? (item.payload[titleKey] as string)
      : String(label ?? item?.name ?? "");

  return (
    <div className="rounded-lg border border-border bg-navy px-3 py-2 shadow-panel">
      <p className="max-w-56 text-xs font-semibold text-navy-foreground">{titulo}</p>
      <p className="mono-tag mt-1 text-royal-soft">
        {item?.value} {sufixo}
      </p>
    </div>
  );
}
