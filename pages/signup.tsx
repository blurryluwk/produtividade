import { useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";

export default function SignupPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!nome.trim()) {
      setErro("Digite o seu nome.");
      return;
    }
    if (!email.trim()) {
      setErro("Digite o seu email.");
      return;
    }
    if (!senha) {
      setErro("Digite uma senha.");
      return;
    }
    if (!confirmarSenha) {
      setErro("Confirme a sua senha.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem. Tente novamente!");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro no cadastro");
        setLoading(false);
        return;
      }

      // Redireciona para login
      router.push("/login");
    } catch {
      setErro("Erro de rede");
      setLoading(false);
    }
  };

  const irParaLogin = () => {
    router.push("/login");
  };

  return (
    <div className="login-container">
      <h1>Novo Cadastro</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Digite o seu nome..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Digite o seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Cadastre sua senha..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a sua senha..."
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <div className="signup-link" onClick={irParaLogin}>
        Faça login aqui!
      </div>

      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
}
