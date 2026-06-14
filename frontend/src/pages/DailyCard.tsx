import { useState } from "react";
import { getRandomCard, TarotCard } from "@/data/tarotCards";
import tarotCardDesign from "@/assets/tarot-card-design.png";
import StarField from "@/components/StarField";

const DailyCard = () => {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const drawCard = () => {
    setIsRevealing(true);
    setRevealed(false);
    setTimeout(() => {
      setCard(getRandomCard());
      setRevealed(true);
      setIsRevealing(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen pt-20 px-4">
      <StarField />
      <div className="relative z-10 container mx-auto max-w-2xl py-16 text-center">
        <h1 className="font-heading text-4xl text-gradient-gold mb-4">Carta do Dia</h1>
        <p className="text-muted-foreground mb-12">
          Concentre-se, respire fundo e peça orientação ao universo.
        </p>

        {!revealed && (
          <div className="flex flex-col items-center">
            <img
              src={tarotCardDesign}
              alt="Carta de Tarot"
              className={`h-72 w-auto mb-8 rounded-xl drop-shadow-2xl ${isRevealing ? "animate-pulse" : "animate-float"}`}
            />
            <button
              onClick={drawCard}
              disabled={isRevealing}
              className="rounded-xl border border-accent/40 bg-accent/10 px-10 py-4 font-heading text-lg text-accent transition-all hover:bg-accent/20 hover:glow-gold disabled:opacity-50"
            >
              {isRevealing ? "Consultando as estrelas..." : "Sortear Carta"}
            </button>
          </div>
        )}

        {revealed && card && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mx-auto max-w-sm rounded-2xl border border-accent/30 bg-card/60 p-8 backdrop-blur-md glow-gold">
              <img
                src={tarotCardDesign}
                alt={card.name}
                className="mx-auto h-48 w-auto mb-4 rounded-lg"
              />
              <p className="text-sm text-muted-foreground mb-1">Arcano {card.id}</p>
              <h2 className="font-heading text-2xl text-accent mb-4">{card.name}</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {card.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-lavender"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-foreground/80 mb-4 italic">"{card.message}"</p>
              <p className="text-sm text-muted-foreground">{card.meaning}</p>
            </div>
            <button
              onClick={() => { setRevealed(false); setCard(null); }}
              className="mt-8 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              ✦ Sortear outra carta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCard;
