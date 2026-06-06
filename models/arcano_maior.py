from carta import Carta

class ArcanoMaior(Carta):
    def __init__(self, nome, numero, palavra_chave, jornada, arquetipo):
        super().__init__(nome=nome, numero=numero, palavra_chave=palavra_chave)
        self.jornada = jornada
        self.arquetipo = arquetipo