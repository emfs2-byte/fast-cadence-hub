const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatarData(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatarDataHora(iso: string): string {
  const texto = dateTimeFormatter.format(new Date(iso));
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatarTrimestre(iso: string): string {
  const date = new Date(iso);
  return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`;
}

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? "") : "";
  return (primeira + ultima).toUpperCase();
}

export function formatarId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}
