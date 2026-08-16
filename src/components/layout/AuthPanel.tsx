import { useState, type FormEvent } from "react";
import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthPanel() {
  const { autenticado, verificando, entrar, sair } = useAuth();

  const [aberto, setAberto] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setEnviando(true);

    try {
      await entrar({ usuario, senha });

      toast.success("Login realizado com sucesso.");
      setAberto(false);
      setSenha("");
    } catch (erro) {
      toast.error(erro instanceof Error ? erro.message : "Não foi possível realizar o login.");
    } finally {
      setEnviando(false);
    }
  }

  function handleLogout() {
    sair();
    toast.success("Sessão encerrada.");
  }

  if (verificando) {
    return null;
  }

  if (autenticado) {
    return (
      <div className="space-y-1">
        <div className="hidden items-center gap-2 px-3 py-1 text-xs text-navy-muted lg:flex">
          <ShieldCheck className="size-4 text-primary" />
          <span>Sessão ativa</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          title="Sair"
          className="w-full justify-start text-navy-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="size-5" />
          <span className="hidden lg:inline">Sair</span>
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          title="Entrar"
          className="w-full justify-start text-navy-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogIn className="size-5" />
          <span className="hidden lg:inline">Entrar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar no painel</DialogTitle>
          <DialogDescription>
            Autentique-se para criar, editar, excluir e registrar presenças.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usuario">Usuário</Label>

            <Input
              id="usuario"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
              placeholder="comite.workshops"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>

            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Credenciais de demonstração: <strong>comite.workshops</strong> /{" "}
            <strong>fast@2025</strong>
          </p>

          <Button type="submit" className="w-full" disabled={enviando}>
            <LogIn className="size-4" />
            {enviando ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
