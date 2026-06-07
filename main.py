import cartomante
import time
from login import run_login
from models.usuario import Usuario
from historico_leituras import historico_leituras
bot = cartomante.GeminiCartomante()

if __name__ == "__main__":
    usuario = run_login()

    if usuario is None:
        print("Encerrando o programa. Até mais!")
        time.sleep(2)
    else:
        print(f"Olá, {usuario.nome}!")
        while True:
            entrada_usuario = input("\n Digite 1 para tiragem de amor, 2 para tiragem diária, 3 para histórico de leituras ou 'sair' para encerrar: ")
            if entrada_usuario.lower().strip() == "sair":
                print("Encerrando o programa. Até mais!")
                break
            if entrada_usuario == "1":
                bot.tiragem(usuario, "amor")
            elif entrada_usuario == "2":
                bot.tiragem(usuario, "diario")
            elif entrada_usuario == "3":
                historico_leituras(usuario)