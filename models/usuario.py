class Usuario:
    def __init__(self, nome, email, dataNascimento, senha, id_usuario=None):
        self.id_usuario = id_usuario
        self.nome = nome
        self.email = email
        self.dataNascimento = dataNascimento
        self.senha = senha

    def __str__(self):
        return f"Usuario(id_usuario={self.id_usuario}, nome='{self.nome}', dataNascimento='{self.dataNascimento}')"