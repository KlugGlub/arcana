import { useState } from "react";
import { ResultadoSintese} from "@/data/synthesisInterpretations";
import { ArcanoMaior } from "@/model/arcanoMaior";
import SynthesisCard from "@/components/SynthesisCard";
import StarField from "@/components/StarField";

type RelationType = "amor" | "amizade" | "familia";

const relationLabels: Record<RelationType, { label: string; icon: string }> = {
  amor: { label: "Amorosa", icon: "❤️" },
  amizade: { label: "Amizade", icon: "🤝" },
  familia: { label: "Familiar", icon: "🏠" },
};
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

const Compatibility = () => {
  const [name1, setName1] = useState(localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")!).nome : "");
  const [name2, setName2] = useState("");
  const [birth1, setBirth1] = useState(localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")!).dataNascimento : "");
  const [birth2, setBirth2] = useState("");
  const [relationType, setRelationType] = useState<RelationType>("amor");
  const [result, setResult] = useState<{
    cartas: ArcanoMaior[];
    sintese: ResultadoSintese;
  } | null>(null);
  const [isReading, setIsReading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataEhValida(birth1)) {
      alert("A data da primeira pessoa é inválida ou está no futuro.");
      return;
    } 

    if (!dataEhValida(birth2)) {
        alert("A data da segunda pessoa é inválida ou está no futuro.");
        return;
    }


    setIsReading(true);

    const resposta = await fetch("http://localhost:8000/api/compatibilidade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({nome1: name1, nome2: name2, data_nascimento1: birth1, data_nascimento2: birth2, tipo_compatibilidade: relationType})
      });
      
      const dados = await resposta.json()
      if(resposta.ok){
        const cartas  = dados.lista_arcanos;
        const sintese = {
          arcanoUm: cartas[0],
          arcanoDois: cartas[1],
          arcanoResultado: cartas[2],
          interacao: dados.interacao,
          leitura: dados.futuro,
        };
        setResult({ cartas, sintese });
        setIsReading(false);
      }
  };

  return (
    <div className="relative min-h-screen pt-20 px-4">
      <StarField />
      <div className="relative z-10 container mx-auto max-w-3xl py-16">
        <h1 className="font-heading text-4xl text-gradient-gold mb-4 text-center">
          Compatibilidade
        </h1>
        <p className="text-muted-foreground mb-12 text-center">
          Insira os nomes e datas de nascimento para descobrir o que os Arcanos revelam sobre a conexão entre vocês.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
          {/* Pessoa 1 */}
          <div className="rounded-xl border border-border bg-card/30 p-5 space-y-4 backdrop-blur-sm">
            <p className="font-heading text-sm text-accent">✦ Primeira pessoa</p>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Nome</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Data de nascimento</label>
              <input
                type="date"
                value={birth1}
                max={hoje}
                onChange={(e) => setBirth1(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>

          {/* Pessoa 2 */}
          <div className="rounded-xl border border-border bg-card/30 p-5 space-y-4 backdrop-blur-sm">
            <p className="font-heading text-sm text-accent">✦ Segunda pessoa</p>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Nome</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                placeholder="Nome da outra pessoa"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Data de nascimento</label>
              <input
                type="date"
                value={birth2}
                max={hoje}
                onChange={(e) => setBirth2(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Tipo de relação</label>
            <div className="flex gap-3">
              {(Object.keys(relationLabels) as RelationType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRelationType(type)}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-heading transition-all ${
                    relationType === type
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-border bg-card/30 text-muted-foreground hover:border-accent/30"
                  }`}
                >
                  {relationLabels[type].icon} {relationLabels[type].label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isReading}
            className="w-full rounded-lg bg-primary py-3 font-heading text-primary-foreground transition-all hover:bg-primary/80 hover:glow-purple disabled:opacity-50"
          >
            {isReading ? "Consultando os Arcanos..." : "Revelar Compatibilidade"}
          </button>
        </form>

        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl text-accent mb-2">
                {name1} & {name2}
              </h2>
              <p className="text-muted-foreground text-sm">
                {relationLabels[relationType].icon} Compatibilidade {relationLabels[relationType].label}
              </p>
            </div>

            {/* Synthesis section */}
            <SynthesisCard
              arcanum1={result.sintese.arcanoUm}
              arcanum2={result.sintese.arcanoDois}
              synthesis={result.sintese.arcanoResultado}
              name1={name1}
              name2={name2}
              interaction={result.sintese.interacao}
              reading={result.sintese.leitura}
              relationIcon={relationLabels[relationType].icon}
              relationLabel={relationLabels[relationType].label}
            />

            {/* Leitura da Relação */}
            <h3 className="font-heading text-lg text-center text-foreground/80 mb-4 mt-10">
              Leitura da Relação
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {result.cartas.map((carta, i) => {
                const positions = ["Passado", "Presente", "Futuro"];
                return (
                  <div
                    key={carta.numero}
                    className="rounded-xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <p className="text-xs text-muted-foreground mb-2">{positions[i]}</p>
                    <div className="text-3xl mb-2">🃏</div>
                    <h3 className="font-heading text-accent mb-2">{carta.nome}</h3>
                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                      {carta.palavra_chave.split(",").map((kw) => (
                        <span key={kw} className="text-xs text-lavender bg-primary/10 rounded-full px-2 py-0.5">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{carta.arquetipo}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setResult(null)}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                ✦ Nova consulta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compatibility;
