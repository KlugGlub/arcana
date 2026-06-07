from models.leitura import Leitura

class LeituraCompatibilidadeAmorosa(Leitura):
    def __init__(self, data_leitura, resultado, usuario, carta_usuario, carta_parceiro, carta_resultado, nome_parceiro, data_nascimento_parceiro, pergunta=None, id_leitura=None, id_compatibilidade=None):
        super().__init__(tipo_tiragem="compatibilidade amorosa", data_leitura=data_leitura, resultado=resultado, usuario=usuario, pergunta=pergunta, id_leitura=id_leitura)
        self.carta_usuario = carta_usuario
        self.carta_parceiro = carta_parceiro
        self.carta_resultado = carta_resultado
        self.nome_parceiro = nome_parceiro
        self.data_nascimento_parceiro = data_nascimento_parceiro
        self.id_compatibilidade = id_compatibilidade