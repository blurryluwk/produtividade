import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.displayName || user?.email}</p>
    </div>
  );
}
