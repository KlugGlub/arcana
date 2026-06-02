import cartomante

bot = cartomante.GeminiCartomante()

if __name__ == "__main__":
    while True:
        entrada_usuario = input("\n Digite 1 para tiragem de amor ou 2 para tiragem diária ou 'sair' para encerrar: ")
        if entrada_usuario.lower().strip() == "sair":
            print("Encerrando o programa. Até mais!")
            break
        if entrada_usuario == "1":
            bot.tiragem("amor")
        elif entrada_usuario == "2":
            bot.tiragem("diario")