/**
 * Camada de infraestrutura do service layer.
 * Simula latência de rede e centraliza o tratamento de erros, de modo que
 * a troca por chamadas HTTP reais não exija mudanças nos componentes.
 */
const DEFAULT_DELAY_MS = 700;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function simulateRequest<T>(
  data: T,
  { delay = DEFAULT_DELAY_MS, resource = "recurso" }: { delay?: number; resource?: string } = {},
): Promise<T> {
  try {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return structuredClone(data);
  } catch (error) {
    throw new ApiError(`Não foi possível carregar ${resource}.`, error);
  }
}
