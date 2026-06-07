from models.leitura import Leitura
from models.carta import Carta

class LeituraCartas(Leitura):
    def __init__(self, data_leitura, resultado, usuario, tipo_tiragem, carta, pergunta=None, id_leitura=None):
        super().__init__(tipo_tiragem=tipo_tiragem, data_leitura=data_leitura, resultado=resultado, usuario=usuario, pergunta=pergunta, id_leitura=id_leitura)
        self.carta = carta

    def __str__(self):
        return f"Leitura de Cartas: (Data: {self.data_leitura}, Resultado: {self.resultado}, Usuário: {self.usuario.nome}, Carta: {self.carta.nome})"