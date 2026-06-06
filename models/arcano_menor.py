from carta import Carta

class ArcanoMenor(Carta):
    def __init__(self, nome, numero, palavra_chave, naipe):
        super().__init__(nome=nome, numero=numero, palavra_chave=palavra_chave)
        self.naipe = naipe