from database.conexao import get_connection
from models.usuario import Usuario
from dao.dao import DAO

class UsuarioDAO(DAO):
    @staticmethod
    def criar(usuario):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "INSERT INTO tb_usuarios (nome, email, data_nascimento, senha) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (usuario.nome, usuario.email, usuario.dataNascimento, usuario.senha))
        conexao.commit()
        cursor.close()
        conexao.close()

    @staticmethod
    def procurar_por_id(id):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "SELECT id, nome, email, data_nascimento FROM tb_usuarios WHERE id = %s"
        cursor.execute(sql, (id,))
        resultado = cursor.fetchone()

        cursor.close()
        conexao.close()

        if resultado:
            return Usuario(id_usuario=resultado[0], nome=resultado[1], email=resultado[2], dataNascimento=resultado[3])
        return None

    @staticmethod
    def atualizar(usuario):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "UPDATE tb_usuarios SET nome = %s, email = %s, data_nascimento = %s, senha = %s WHERE id = %s"
        cursor.execute(sql, (usuario.nome, usuario.email, usuario.dataNascimento, usuario.senha, usuario.id))
        conexao.commit()
        cursor.close()
        conexao.close()

    @staticmethod
    def deletar(id):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "DELETE FROM tb_usuarios WHERE id = %s"
        cursor.execute(sql, (id,))
        conexao.commit()
        cursor.close()
        conexao.close()

    def procurar_por_email(email):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "SELECT id, nome, email, data_nascimento, senha FROM tb_usuarios WHERE email = %s"
        cursor.execute(sql, (email,))
        resultado = cursor.fetchone()

        cursor.close()
        conexao.close()

        if resultado:
            return Usuario(id_usuario=resultado[0], nome=resultado[1], email=resultado[2], dataNascimento=resultado[3], senha=resultado[4])
        return None

