import { Link } from "react-router-dom";
import mascot from "@/assets/mascot.png";
import mascotCupid from "@/assets/mascot-cupid.png";
import StarField from "@/components/StarField";

const Home = () => {
  const usuarioLogado = localStorage.getItem("usuario") !== null;
  return (
    <div className="relative min-h-screen pt-20">
      <StarField />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
        <img
          src={mascot}
          alt="Mascote Arcana"
          className="mb-8 h-48 w-48 animate-float drop-shadow-2xl md:h-64 md:w-64"
        />
        <h1 className="font-heading text-4xl md:text-6xl text-gradient-gold mb-4">
          Arcana
        </h1>
        <p className="max-w-xl text-foreground/70 text-lg mb-8 font-body">
          Descubra a compatibilidade entre almas através dos Arcanos Maiores do Tarot.
          Amor, amizade ou família — o universo revela as conexões que unem vocês.
        </p>
        {usuarioLogado ? (
          <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/compatibilidade"
            className="rounded-xl border border-accent/40 bg-accent/10 px-8 py-3 font-heading text-accent transition-all hover:bg-accent/20 hover:glow-gold"
          >
            Descobrir Compatibilidade
          </Link>
          <Link
            to="/carta-diaria"
            className="rounded-xl border border-primary/40 bg-primary/10 px-8 py-3 font-heading text-primary-foreground transition-all hover:bg-primary/20 hover:glow-purple"
          >
            Carta do Dia
          </Link>
        </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
              <p className="max-w-md text-foreground/70 font-body">
                Faça login para acessar sua carta do dia e descobrir sua compatibilidade pelos Arcanos.
              </p>

              <Link
                to="/login"
                className="rounded-xl border border-accent/40 bg-accent/10 px-8 py-3 font-heading text-accent transition-all hover:bg-accent/20 hover:glow-gold"
              >
                Entrar ou Cadastrar
              </Link>
            </div>
        )}
      </section>

      {/* About */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-center text-gradient-gold mb-12">
            O que é o Arcana?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-foreground/70">
              <p>
                O <strong className="text-accent">Arcana</strong> é um portal místico que utiliza
                a sabedoria milenar dos 22 Arcanos Maiores do Tarot para revelar a compatibilidade
                entre duas pessoas.
              </p>
              <p>
                Seja no amor, na amizade ou nos laços familiares, as cartas revelam
                as energias que conectam e desafiam cada relação, oferecendo insights
                profundos sobre seus vínculos.
              </p>
              <p>
                Além disso, receba diariamente uma mensagem do universo com a sua
                <strong className="text-accent"> Carta do Dia</strong>, trazendo orientação
                e reflexão para guiar seus passos.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={mascotCupid}
                alt="Mascote Arcana Cupido"
                className="h-64 w-64 animate-float drop-shadow-2xl"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl text-center text-gradient-gold mb-12">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🔮", title: "Compatibilidade", desc: "Descubra a energia que une você a alguém especial através dos Arcanos Maiores." },
              { icon: "🃏", title: "Carta Diária", desc: "Receba uma mensagem do universo todos os dias com orientação e sabedoria." },
              { icon: "✨", title: "Três Tipos", desc: "Explore compatibilidade amorosa, de amizade ou familiar entre duas pessoas." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-accent/30 hover:glow-gold"
              >
                <div className="mb-4 text-4xl">{f.icon}</div>
                <h3 className="font-heading text-lg text-accent mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-gradient-gold mb-8">
            Desenvolvedores
          </h2>
          <p className="text-muted-foreground mb-8">
            Projeto desenvolvido com ✦ por estudantes universitários apaixonados por tecnologia e misticismo.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Dev 1", "Dev 2", "Dev 3", "Dev 4"].map((dev) => (
              <div
                key={dev}
                className="rounded-xl border border-border bg-card/30 p-4 backdrop-blur-sm"
              >
                <div className="mb-2 mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                  🌙
                </div>
                <p className="font-heading text-sm text-accent">{dev}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>✦ Arcana — Desvendando conexões através do Tarot ✦</p>
      </footer>
    </div>
  );
};

export default Home;
