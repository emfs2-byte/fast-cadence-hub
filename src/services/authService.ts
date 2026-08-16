import { apiFetch, setToken, clearToken, getToken } from "./api";

export interface LoginInput {
  usuario: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  expiraEm: string;
}

export async function login(dados: LoginInput): Promise<void> {
  const resposta = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(dados),
  });
  setToken(resposta.token);
}

export function logout(): void {
  clearToken();
}

export function estaAutenticado(): boolean {
  return getToken() !== null;
}
