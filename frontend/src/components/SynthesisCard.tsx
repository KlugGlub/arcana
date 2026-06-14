import { TarotCard } from "@/data/tarotCards";

interface SynthesisCardProps {
  arcanum1: TarotCard;
  arcanum2: TarotCard;
  synthesis: TarotCard;
  name1: string;
  name2: string;
  interaction: string;
  reading: string;
  relationIcon: string;
  relationLabel: string;
}

const SynthesisCard = ({
  arcanum1,
  arcanum2,
  synthesis,
  name1,
  name2,
  interaction,
  reading,
  relationIcon,
  relationLabel,
}: SynthesisCardProps) => {
  return (
    <div className="space-y-8">
      {/* Two cards side by side */}
      <div className="flex justify-center gap-6 md:gap-10">
        {[
          { card: arcanum1, name: name1 },
          { card: arcanum2, name: name2 },
        ].map(({ card, name }) => (
          <div
            key={name}
            className="w-40 md:w-48 rounded-xl border border-border bg-card/40 p-5 text-center backdrop-blur-sm transition-all hover:border-accent/40 hover:glow-gold"
          >
            <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">
              Arcano de {name}
            </p>
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="font-heading text-sm text-accent mb-1">{card.name}</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{card.meaning}</p>
          </div>
        ))}
      </div>

      {/* Connection line */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-px h-6 bg-gradient-to-b from-accent/50 to-accent/0" />
        <span className="text-xs text-accent font-heading">
          {arcanum1.id} + {arcanum2.id} = {synthesis.id}
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-accent/0 to-accent/50" />
      </div>

      {/* Synthesis card - larger and glowing */}
      <div className="flex justify-center">
        <div className="w-56 md:w-64 rounded-2xl border-2 border-accent/50 bg-gradient-to-b from-accent/10 to-primary/10 p-6 text-center backdrop-blur-sm glow-gold animate-float">
          <p className="text-[10px] text-accent/80 mb-2 uppercase tracking-widest font-heading">
            ✦ Arcano de Síntese ✦
          </p>
          <div className="text-5xl mb-3 animate-sparkle">✨</div>
          <h3 className="font-heading text-xl text-accent mb-2">{synthesis.name}</h3>
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {synthesis.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] text-lavender bg-primary/20 rounded-full px-2 py-0.5"
              >
                {kw}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{synthesis.meaning}</p>
        </div>
      </div>

      {/* Interaction analysis */}
      <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-sm">
        <h4 className="font-heading text-sm text-accent mb-3 text-center">
          🔮 Como as Personalidades Interagem
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">{interaction}</p>
      </div>

      {/* Relationship reading */}
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm">
        <h4 className="font-heading text-sm text-accent mb-3 text-center">
          {relationIcon} O que {synthesis.name} revela sobre o futuro
        </h4>
        <p className="text-sm text-foreground/80 leading-relaxed text-center italic">
          "{reading}"
        </p>
      </div>
    </div>
  );
};

export default SynthesisCard;
