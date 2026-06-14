from google import genai
from google.genai import types
import google.genai.errors as genai_errors
import config
from datetime import datetime
from dao.arcano_maior_dao import ArcanoMaiorDAO
from dao.leitura_comp_amorosa_dao import LeituraCompatibilidadeAmorosaDAO
from dao.leitura_dao import LeituraDAO
from dao.leitura_cartas_dao import LeituraCartasDAO
from models.leitura_comp_amorosa import LeituraCompatibilidadeAmorosa
from models.leitura_cartas import LeituraCartas

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

    def leitura_compatibilidade_interacao(self, lista_arcanos, tipo_compatibilidade):
        prompt = f"""
Leve em consideração que a leitura deve ser feita baseada em um relacionamento de: {tipo_compatibilidade}        
CENÁRIO A - TIPO 1

Analise como as personalidades destes dois arcanos interagem no relacionamento.

Arcano da primeira pessoa:
{lista_arcanos[0].__str__()}

Arcano da segunda pessoa:
{lista_arcanos[1].__str__()}

Responda em no máximo 4 linhas.
"""
        return self.gerar_resposta(prompt)

    def leitura_compatibilidade_futuro(self, lista_arcanos, tipo_compatibilidade):
        prompt = f"""
Leve em consideração que a leitura deve ser feita baseada em um relacionamento de: {tipo_compatibilidade}
CENÁRIO A - TIPO 2

Analise o que o arcano resultante da compatibilidade revela como tendência futura do relacionamento.

Arcano resultante:
{lista_arcanos[2].__str__()}

Responda em no máximo 4 linhas.
Trate o futuro como tendência comportamental, nunca como previsão certa.
"""
        return self.gerar_resposta(prompt)

    def tiragem_diaria(self, arcano):
        prompt = f""" esta é uma tiragem diária baseada no CENÁRIO B.
Arcano resultante:
{arcano.__str__()}
"""
        return self.gerar_resposta(prompt)
