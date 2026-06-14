from database.conexao import get_connection
from models.arcano_maior import ArcanoMaior

class ArcanoMaiorDAO():
    @staticmethod
    def buscar_por_numero(numero):
        conexao = get_connection()
        cursor = conexao.cursor()

        sql = "SELECT am.id_carta, c.nome, c.numero, c.palavra_chave, am.jornada, am.arquetipo FROM tb_cartas c JOIN tb_arcanos_maiores am ON am.id_carta = c.id WHERE c.numero = %s and c.arcano = 'maior'"
        cursor.execute(sql, (numero,))
        resultado = cursor.fetchone()

        cursor.close()
        conexao.close()

        if resultado:
            return ArcanoMaior(id_carta=resultado[0], nome=resultado[1], numero=resultado[2], palavra_chave=resultado[3], jornada=resultado[4], arquetipo=resultado[5])
        return None