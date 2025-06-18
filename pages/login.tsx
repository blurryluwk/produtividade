import { useState } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha email e senha");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro no login");
        setLoading(false);
        return;
      }

      // Armazena token (você pode usar cookie httpOnly para segurança melhor)
      localStorage.setItem("token", data.token);

      // Redireciona para dashboard
      router.push("/dashboard");
    } catch (error) {
      setErro("Erro de rede");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha..."
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="signup-link" onClick={() => router.push("/signup")}>
        Crie sua conta aqui!
      </div>

      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
}
