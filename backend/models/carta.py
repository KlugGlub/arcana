class Carta:
    def __init__(self, nome, numero, palavra_chave, id_carta=None):
        self.id_carta = id_carta
        self.nome = nome
        self.numero = numero
        self.palavra_chave = palavra_chave