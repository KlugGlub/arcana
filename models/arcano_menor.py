from models.carta import Carta

class ArcanoMenor(Carta):
    def __init__(self, id_carta, nome, numero, palavra_chave, naipe):
        super().__init__(id_carta=id_carta, nome=nome, numero=numero, palavra_chave=palavra_chave)
        self.naipe = naipe

    def __str__(self):
        return f"Arcano Menor: {self.nome} (Número: {self.numero}, Palavra-chave: {self.palavra_chave}, Naipe: {self.naipe})"