from dao.arcano_maior_dao import ArcanoMaiorDAO
import random

class LeituraService:
    @staticmethod
    def calcular_arcano(n):
        soma = 0
        for num in n:
            soma = int(num) + soma

        if soma > 22:
            return LeituraService.calcular_arcano(str(soma))

        return ArcanoMaiorDAO.buscar_por_numero(soma)
    
    @staticmethod
    def calculo_amor(data_um, data_dois):
        lista_arcanos = []
        try:
            data_um_format = data_um.strip().replace("-","")
            arcano_um = LeituraService.calcular_arcano(data_um_format)
            lista_arcanos.append(arcano_um)

            data_dois_format = data_dois.strip().replace("-","")
            arcano_dois = LeituraService.calcular_arcano(data_dois_format)
            lista_arcanos.append(arcano_dois)

            arcano_compatibilidade_format = str(arcano_um.numero) + str(arcano_dois.numero)
            arcano_compatibilidade = LeituraService.calcular_arcano(arcano_compatibilidade_format)

            lista_arcanos.append(arcano_compatibilidade)
        except ValueError:
            raise ValueError("Erro na leitura.")
        return lista_arcanos

    @staticmethod
    def sortear_arcano():
        return ArcanoMaiorDAO.buscar_por_numero(random.randint(0, 22))

