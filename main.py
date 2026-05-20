from google import genai
from google.genai import types
import config
import random
 
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
        return response.text
    
    def calculo_amor(data_um="2006-02-06", data_dois="2006-03-29"):
        return print(arcano_um)
    
    def tiragem(self, tipo):
        if tipo == "amor":
            prompt = f"Além dos seus conhecimentos base, você domina a tiragem de compatiblidade amorosa, tirei o arcano {arcano}, o que isto significa?"
            self.gerar_resposta(prompt)
        if tipo == "diario":
            prompt = ""
            self.gerar_resposta(prompt)

assistente = GeminiCartomante(client=client)

texto = "2006-02-07"
new_text = texto.replace("-", "")
print(new_text)
soma = 0
for n in new_text:
    soma = int(n) + soma

arcano = soma
print(arcano)