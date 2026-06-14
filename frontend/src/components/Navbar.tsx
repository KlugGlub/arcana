import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mascotCircle from "@/assets/mascot-circle.png";

interface NavbarProps {
  userName?: string | null;
  onLogout?: () => void;
}

const Navbar = ({ userName, onLogout }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const usuarioLogado = localStorage.getItem("usuario") !== null;
  const links = (usuarioLogado) ? [
    { to: "/", label: "Home" },
    { to: "/carta-diaria", label: "Carta Diária" },
    { to: "/compatibilidade", label: "Compatibilidade" },
  ] : [{ to: "/", label: "Home" }];

  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="gradient-accent-bar w-full" />
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={mascotCircle} alt="Arcana mascot" className="h-10 w-10 rounded-full" />
          <span className="font-heading text-xl text-gradient-gold">Arcana</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm transition-colors hover:text-accent ${
                isActive(link.to) ? "text-accent" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {userName ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-accent font-heading">✦ {userName}</span>
              <button
                onClick={onLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent transition-all hover:bg-accent/20"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm ${isActive(link.to) ? "text-accent" : "text-foreground/70"}`}
            >
              {link.label}
            </Link>
          ))}
          {userName ? (
            <>
              <span className="block text-sm text-accent font-heading">✦ {userName}</span>
              <button onClick={onLogout} className="text-sm text-muted-foreground">Sair</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-accent">
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
