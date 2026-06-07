from models.leitura_comp_amorosa import LeituraCompatibilidadeAmorosa
from dao.dao import DAO
from database.conexao import get_connection

class LeituraCompatibilidadeAmorosaDAO(DAO):
    @staticmethod
    def criar(leitura: LeituraCompatibilidadeAmorosa):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = """INSERT INTO tb_compatibilidade_amorosa (id_leitura, id_carta_usuario, id_carta_parceiro, id_carta_resultado, nome_parceiro, data_nascimento_parceiro) 
                 VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, (leitura.id_leitura, leitura.carta_usuario.id_carta, leitura.carta_parceiro.id_carta, leitura.carta_resultado.id_carta, leitura.nome_parceiro, leitura.data_nascimento_parceiro))
        conexao.commit()
        cursor.close()
        conexao.close()