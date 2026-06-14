class Usuario:
    def __init__(self, nome, email, data_nascimento, senha, id_usuario=None):
        self.id_usuario = id_usuario
        self.nome = nome
        self.email = email
        self.data_nascimento = data_nascimento
        self.senha = senha

    def __str__(self):
        return f"Usuario(id_usuario={self.id_usuario}, nome='{self.nome}', data_nascimento='{self.data_nascimento}')"