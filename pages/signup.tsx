import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app } from '../lib/firebaseConfig';
import { useRouter } from 'next/router';
import '../app/globals.css';

export default function SignupPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const auth = getAuth(app);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Checagem de dados
    if (!nome.trim()) {
      setErro('Digite o seu nome.');
      return;
    }

    if (!email.trim()) {
      setErro('Digite o seu email.');
      return;
    }

    if (!senha) {
      setErro('Digite uma senha.');
      return;
    }

    if (!confirmarSenha) {
      setErro('Confirme a sua senha.');
      return;
    }

    // Validação de senha
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Tente novamente!');
      return;
    }

    try {
      // cria usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      // atualiza perfil com o nome
      await updateProfile(userCredential.user, {
        displayName: nome,
      });

      console.log('Usuário criado:', userCredential.user);
      router.push('/login');
    } catch (error: any) {
      if (error.code === 'auth/weak-password') {
        setErro('A senha precisa ter pelo menos 6 caracteres!');
      } else {
        setErro(error.message || 'Erro no cadastro');
      }
    }
  };

  const irParaLogin = () => {
    router.push('/login');
  };

  return (
    <div className="login-container">
      <h1>Novo Cadastro</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Digite o seu nome..."
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Digite o seu email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Cadastre sua senha..."
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme a sua senha..."
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <div
        className="signup-link"
        onClick={irParaLogin}
      >
        Faça login aqui!
      </div>

      {erro && <p className="error-message">{erro}</p>}
    </div>
  );
}
