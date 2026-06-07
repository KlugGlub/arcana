from models.leitura import Leitura
from dao.dao import DAO
from database.conexao import get_connection

class LeituraDAO(DAO):
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
    def procurar_por_usuario(id_usuario):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "SELECT id, tipo_tiragem, data_leitura, resultado, pergunta FROM tb_leituras WHERE id_usuario = %s"
        cursor.execute(sql, (id_usuario,))
        resultados = cursor.fetchall()

        cursor.close()
        conexao.close()

        leituras = []
        for resultado in resultados:
            leitura = Leitura(id_leitura=resultado[0], tipo_tiragem=resultado[1], data_leitura=resultado[2], resultado=resultado[3], usuario=None, pergunta=resultado[4])
            leituras.append(leitura)
        
        return leituras
        
