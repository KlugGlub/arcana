from google import genai
from google.genai import types
import config
 
client = genai.Client(api_key=config.GEMINI_API_KEY)

class GeminiCartomante:
    def __init__(self, client: genai.Client, model: str = "gemini-3.5-flash"):
        self.client = client
        self.model = model
        

        self.default_config = types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level="high"),
            system_instruction=config.CONTEXT
        )

    def analisar_tiragem(self, entrada_usuario: str) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=entrada_usuario,
            config=self.default_config
        )
        return response.text
    


assistente = GeminiCartomante(client=client)

prompt = "Hoje tirei no meu tarot o tolo na tiragem diária"
print(assistente.analisar_tiragem(prompt))
