import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mascotCircle from "@/assets/mascot-circle.png";
import StarField from "@/components/StarField";
import {Usuario} from "@/model/usuario.ts";

interface LoginProps {
  onLogin: (nome: string) => void;
}

const hoje = new Date().toISOString().split("T")[0];

const dataEhValida = (data: string) => {
  if (!data) {
    return false;
  }

  const dataInformada = new Date(data + "T00:00:00");
  const hoje = new Date();

  hoje.setHours(0, 0, 0, 0);

  if (Number.isNaN(dataInformada.getTime())) {
    return false;
  }

  if (dataInformada > hoje) {
    return false;
  }

  return true;
};

const Login = ({ onLogin }: LoginProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    const usuario = new Usuario(email, senha, nome, data_nascimento);
    if(isSignup) {
      if (!dataEhValida(data_nascimento)) {
      alert("A data da primeira pessoa é inválida ou está no futuro.");
      return;
    }
      const resposta = await fetch("http://localhost:8000/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const dados = await resposta.json();
      if(resposta.ok) {
        alert(dados.message);
        setIsSignup(false);
      } else {
        alert(dados.detail);
      }
    }else{
      const usuario = new Usuario(email, senha);
      const resposta = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });
      const dados = await resposta.json();
      if(resposta.ok) {
        setIsSignup(false);
        onLogin(dados.usuario.nome);
        localStorage.setItem("usuario", JSON.stringify({
          email: dados.usuario.email,
          nome: dados.usuario.nome,
          dataNascimento: dados.usuario.data_nascimento,
        }));
        navigate("/");
      } else {
        alert(dados.detail);
      }
    }
    
  };

  return (
    <div className="relative min-h-screen pt-20 flex items-center justify-center px-4">
      <StarField />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-md glow-purple">
        <div className="flex flex-col items-center mb-6">
          <img src={mascotCircle} alt="Arcana" className="h-20 w-20 mb-4" />
          <h1 className="font-heading text-2xl text-gradient-gold">
            {isSignup ? "Criar Conta" : "Entrar"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required={isSignup}
                  className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Data de nascimento</label>
                <input
                  type="date"
                  value={data_nascimento}
                  max={hoje}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required={isSignup}
                  className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  placeholder="••••••••"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-heading text-primary-foreground transition-all hover:bg-primary/80 hover:glow-purple"
          >
            {isSignup ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-accent hover:underline"
          >
            {isSignup ? "Entrar" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
