from models.carta import Carta

class ArcanoMaior(Carta):
    def __init__(self, id_carta, nome, numero, palavra_chave, jornada, arquetipo):
        super().__init__(id_carta=id_carta, nome=nome, numero=numero, palavra_chave=palavra_chave)
        self.jornada = jornada
        self.arquetipo = arquetipo

    def to_dict(self):
        return {
            "id_carta": self.id_carta,
            "nome": self.nome,
            "numero": self.numero,
            "palavra_chave": self.palavra_chave,
            "jornada": self.jornada,
            "arquetipo": self.arquetipo
        }

    def __str__(self):
        return f"Arcano Maior: {self.nome} (Número: {self.numero}, Palavra-chave: {self.palavra_chave}, Jornada: {self.jornada}, Arquétipo: {self.arquetipo})"