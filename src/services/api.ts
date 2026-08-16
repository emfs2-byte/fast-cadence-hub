/**
 * Cliente base da API. Centraliza a URL, o tratamento de erros e o envio do
 * token JWT, para que os demais services não precisem repetir essa lógica.
 */

const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:5000/api";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";

    if (status !== undefined) {
      this.status = status;
    }
  }
}

const TOKEN_KEY = "fast:token";

function disponivel(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getToken(): string | null {
  if (!disponivel()) return null;

  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (!disponivel()) return;

  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (!disponivel()) return;

  window.localStorage.removeItem(TOKEN_KEY);
}

interface RequestOptions extends RequestInit {
  /** Se true, envia o header Authorization com o token JWT salvo. */
  auth?: boolean;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth = false, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string> | undefined),
  };

  if (auth) {
    const token = getToken();

    if (!token) {
      throw new ApiError("Sessão expirada. Faça login novamente.", 401);
    }

    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
    });
  } catch {
    throw new ApiError("Não foi possível conectar à API. Verifique se o backend está rodando.");
  }

  // 204 No Content — endpoints de update/delete não retornam corpo.
  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");

  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const mensagem = body?.mensagem ?? body?.title ?? `Erro ${response.status} ao chamar a API.`;

    throw new ApiError(mensagem, response.status);
  }

  return body as T;
}
