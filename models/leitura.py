from models.usuario import Usuario

class Leitura:
    def __init__(self, tipo_tiragem, data_leitura, resultado, usuario, pergunta=None, id_leitura=None):
        self.id_leitura = id_leitura
        self.tipo_tiragem = tipo_tiragem
        self.data_leitura = data_leitura
        self.resultado = resultado
        self.usuario = usuario
        self.pergunta = pergunta

    def __str__(self):
        return f"Leitura: {self.tipo_tiragem} (Data: {self.data_leitura}, Resultado: {self.resultado}, Usuário: {self.usuario.nome})"