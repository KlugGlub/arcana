from models.leitura_cartas import LeituraCartas
from dao.dao import DAO
from database.conexao import get_connection

class LeituraCartasDAO(DAO):
    @staticmethod
    def criar(leitura: LeituraCartas):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = """INSERT INTO tb_leitura_cartas (id_leitura, id_carta) VALUES (%s, %s)"""
        cursor.execute(sql, (leitura.id_leitura, leitura.carta.id_carta))
        conexao.commit()
        cursor.close()
        conexao.close()