from models.leitura import Leitura
from database.conexao import get_connection

class LeituraDAO():
    @staticmethod
    def criar(leitura: Leitura):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "INSERT INTO tb_leituras (tipo_tiragem, data_leitura, resultado, id_usuario, pergunta) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (leitura.tipo_tiragem, leitura.data_leitura, leitura.resultado, leitura.usuario.id_usuario, leitura.pergunta))
        conexao.commit()

        id_leitura = cursor.lastrowid

        cursor.close()
        conexao.close()

        return id_leitura

    @staticmethod
    def procurar_por_usuario(usuario):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "SELECT l.id, l.tipo_tiragem, l.data_leitura, l.resultado, l.pergunta FROM tb_leituras l WHERE l.id_usuario = %s"
        cursor.execute(sql, (usuario.id_usuario,))
        resultados = cursor.fetchall()

        cursor.close()
        conexao.close()

        leituras = []
        for resultado in resultados:
            leitura = Leitura(id_leitura=resultado[0], tipo_tiragem=resultado[1], data_leitura=resultado[2], resultado=resultado[3].decode('utf-8'), usuario=usuario, pergunta=resultado[4].decode('utf-8'))
            leituras.append(leitura)
        
        return leituras
        
