from dao.leitura_dao import LeituraDAO

def historico_leituras(usuario):
        try:
            leituras = LeituraDAO.procurar_por_usuario(usuario)
            if not leituras:
                print("Nenhuma leitura encontrada para este usuário.")
                return
            print(f"\nHistórico de Leituras para {usuario.nome}:\n")
            for leitura in leituras:
                print(leitura.__str__()+"\n")
        except Exception as e:
            print(f"Erro ao buscar histórico de leituras: {e}")