from database.conexao import get_connection
from models.usuario import Usuario

class UsuarioDAO:
    @staticmethod
    def inserir(usuario):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "INSERT INTO tb_usuarios (nome, username, data_nascimento, senha) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (usuario.nome, usuario.username, usuario.dataNascimento, usuario.senha))
        conexao.commit()
        cursor.close()
        conexao.close()

