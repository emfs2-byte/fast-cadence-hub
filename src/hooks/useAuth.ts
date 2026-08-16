import { useCallback, useEffect, useState } from "react";
import {
  estaAutenticado,
  login as loginService,
  logout as logoutService,
  type LoginInput,
} from "@/services/authService";

export function useAuth() {
  const [autenticado, setAutenticado] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    setAutenticado(estaAutenticado());
    setVerificando(false);
  }, []);

  const entrar = useCallback(async (dados: LoginInput) => {
    await loginService(dados);
    setAutenticado(true);
  }, []);

  const sair = useCallback(() => {
    logoutService();
    setAutenticado(false);
  }, []);

  return {
    autenticado,
    verificando,
    entrar,
    sair,
  };
}
