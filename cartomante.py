from google import genai
from google.genai import types
import google.genai.errors as genai_errors
import config
import random
from datetime import datetime
from dao.arcano_maior_dao import ArcanoMaiorDAO
from dao.leitura_comp_amorosa_dao import LeituraCompatibilidadeAmorosaDAO
from dao.leitura_dao import LeituraDAO
from models.leitura_comp_amorosa import LeituraCompatibilidadeAmorosa

class GeminiCartomante:
    def __init__(self, model: str = "gemini-3.5-flash"):
        self.client = genai.Client(api_key=config.GEMINI_API_KEY)
        self.model = model
        

        self.default_config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="high"),
            system_instruction=config.CONTEXT
        )

    def gerar_resposta(self, entrada_usuario: str) -> str:
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=entrada_usuario,
                config=self.default_config
            )
            print(response.text)
            return response.text
        except genai_errors.ClientError as error:
            debug_message = (
                f"[CLIENT ERROR] status={getattr(error, 'status', None)} "
                f"message={error.message}"
            )
            print(debug_message)
            return debug_message
        except genai_errors.ServerError as error:
            debug_message = (
                f"[SERVER ERROR] status={getattr(error, 'status', None)} "
                f"message={error.message}"
            )
            print(debug_message)
            return debug_message
        except genai_errors.APIError as error:
            debug_message = (
                f"[API ERROR] status={getattr(error, 'status', None)} "
                f"message={error.message}"
            )
            print(debug_message)
            return debug_message
        except Exception as error:
            debug_message = f"[UNEXPECTED ERROR] {type(error).__name__}: {error}"
            print(debug_message)
            return debug_message
    
    def calcular_arcano(self, n):
        soma = 0
        for num in n:
            soma = int(num) + soma
        return ArcanoMaiorDAO.buscar_por_numero(soma)
    
    def calculo_amor(self, data_um, data_dois):
        lista_arcanos = []
        data_um_format = data_um.strip().replace("/","")
        arcano_um = self.calcular_arcano(data_um_format)
        lista_arcanos.append(arcano_um)
        print(f"Seu arcano é: {arcano_um.nome}")
        data_dois_format = data_dois.strip().replace("/","")
        arcano_dois = self.calcular_arcano(data_dois_format)
        lista_arcanos.append(arcano_dois)
        print(f"O arcano da outra pessoa é: {arcano_dois.nome}")
        arcano_compatibilidade_format = str(arcano_um.numero) + str(arcano_dois.numero)
        arcano_compatibilidade = self.calcular_arcano(arcano_compatibilidade_format)
        lista_arcanos.append(arcano_compatibilidade)
        return lista_arcanos
    
    def obter_data_valida(self, mensagem):
        while True:
            entrada = input(mensagem).strip()
            try:
                datetime.strptime(entrada, "%d/%m/%Y")
                return entrada  # Retorna a string válida e sai do loop
            except ValueError:
                print("❌ Formato inválido ou data inexistente! Por favor, use o formato DD/MM/AAAA (ex: 06/02/2006).")

    def tiragem(self, usuario, tipo):
        if tipo == "amor":
            data_um = usuario.dataNascimento.strftime("%d/%m/%Y")
            print(f"Data de nascimento do usuário: {data_um}")
            parceiro = input("Informe o nome do(a) parceiro(a): ")
            data_dois = self.obter_data_valida("Informe a data de nascimento da outra pessoa (DD/MM/AAAA):")
            lista_arcanos = self.calculo_amor(data_um, data_dois)
            prompt = f""" esta é uma tiragem de compatibilidade amorosa o resultado entre o meu arcano e o arcano da outra pessoa, aqui estão os detalhes do arcano resolvido: {lista_arcanos[2].__str__()}"""
            print("Carregando resposta...")
            resposta = self.gerar_resposta(prompt).encode('utf-8')
            leitura = LeituraCompatibilidadeAmorosa(
                data_leitura=datetime.now(), 
                resultado=resposta, 
                usuario=usuario, 
                carta_usuario=lista_arcanos[0], 
                carta_parceiro=lista_arcanos[1], 
                carta_resultado=lista_arcanos[2], 
                nome_parceiro=parceiro, 
                data_nascimento_parceiro=datetime.strptime(data_dois, "%d/%m/%Y").strftime("%Y-%m-%d"), 
                pergunta=f"Compatibilidade amorosa entre {data_um} e {data_dois}")

            try:
                leitura.id_leitura = LeituraDAO.criar(leitura)
                LeituraCompatibilidadeAmorosaDAO.criar(leitura)
            except Exception as e:
                print(f"Erro ao salvar leitura: {e}")

        if tipo == "diario":
            arcano = ArcanoMaiorDAO.buscar_por_numero(random.randint(0, 21))
            prompt = f""" esta é uma tiragem diária o arcano tirado é: {arcano.__str__()}"""
            print("Carregando resposta...")
            self.gerar_resposta(prompt)