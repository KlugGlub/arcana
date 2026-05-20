from google import genai
from google.genai import types
import config
import random
from datetime import datetime

client = genai.Client(api_key=config.GEMINI_API_KEY)

class GeminiCartomante:
    def __init__(self, client: genai.Client, model: str = "gemini-3.5-flash"):
        self.client = client
        self.model = model
        

        self.default_config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="high"),
            system_instruction=config.CONTEXT
        )

    def gerar_resposta(self, entrada_usuario: str) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=entrada_usuario,
            config=self.default_config
        )
        return print(response.text)
    
    def soma_digitos(self, n):
        soma = 0
        for num in n:
            soma = int(num) + soma
        return soma
    
    def calculo_amor(self, data_um="2006-02-06", data_dois="2006-03-29"):
        data_um_format = data_um.strip().replace("/","")
        arcano_um = self.soma_digitos(data_um_format)
        data_dois_format = data_dois.strip().replace("/","")
        arcano_dois = self.soma_digitos(data_dois_format)
        arcano_compatibilidade_format = str(arcano_um) + str(arcano_dois)
        arcano_compatibilidade = self.soma_digitos(arcano_compatibilidade_format)
        return arcano_compatibilidade
    
    def obter_data_valida(self, mensagem):
        while True:
            entrada = input(mensagem).strip()
            try:
                datetime.strptime(entrada, "%d/%m/%Y")
                return entrada  # Retorna a string válida e sai do loop
            except ValueError:
                print("❌ Formato inválido ou data inexistente! Por favor, use o formato DD/MM/AAAA (ex: 06/02/2006).")

    def tiragem(self, tipo):
        if tipo == "amor":
            data_um = self.obter_data_valida("Informe sua data de nascimento (DD/MM/AAAA): ")
            data_dois = self.obter_data_valida("Informe a data de nascimento da outra pessoa (DD/MM/AAAA):")
            arcano = self.calculo_amor(data_um, data_dois)
            prompt = f"""Contexto (Não o explícite durante a sua resposta, sua resposta deve ser escrita sem o cita-lo): A compatibilidade amorosa é calculada pela soma dos dígitos dos arcanos das duas pessoas, então calcula o arcano de um,
            calcula o arcano do outro e por fim soma o dígitos de cada arcano por exemplo: (2+2+1+2 = 7) o arcano 7 representa a compatibilidade amorosa das duas pessoas.
            o resultado entre o meu arcano e o arcano da outra pessoa: {arcano}"""
            self.gerar_resposta(prompt)
        if tipo == "diario":
            prompt = ""
            self.gerar_resposta(prompt)

assistente = GeminiCartomante(client=client)

assistente.tiragem("amor")