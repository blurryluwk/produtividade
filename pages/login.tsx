import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../lib/firebaseConfig';
import { useRouter } from 'next/router';
import '../app/globals.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push('/dashboard');
    } catch (error: any) {
      setErro(error.message || 'Erro no login');
    }
  };

  const irParaCadastro = () => {
    router.push('/signup');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha..."
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <div
        className="signup-link"
        onClick={irParaCadastro}
      >
        Crie sua conta aqui!
      </div>

      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
}
