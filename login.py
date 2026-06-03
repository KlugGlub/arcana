import bcrypt

from datetime import datetime

from dao.user_dao import insert, list_by_username
from home import run_home


def validar_data_nascimento(data_texto):
    """
    Valida se a data está no formato DD/MM/AAAA
    e se representa uma data real.
    """

    try:
        data = datetime.strptime(data_texto, "%d/%m/%Y").date()

        hoje = datetime.today().date()

        if data > hoje:
            print("A data de nascimento não pode ser no futuro.")
            return None

        return data

    except ValueError:
        print("Data inválida. Use o formato DD/MM/AAAA.")
        return None


def solicitar_data_nascimento():
    data_nascimento = None

    while data_nascimento is None:
        data_texto = input("Informe sua data de nascimento (DD/MM/AAAA): ")
        data_nascimento = validar_data_nascimento(data_texto)

    return data_nascimento


def run_login():
    opc = None

    print("""
BEM VINDO AO ARCANA
""")

    while opc != 0:
        print("""
Escolha uma opção:
1) Fazer login;
2) Cadastrar usuário;
0) Encerrar o programa.
""")

        try:
            opc = int(input())
        except ValueError:
            opc = -1

        while opc < 0 or opc > 2:
            try:
                opc = int(input("Digite uma opção válida, entre 0 e 2: "))
            except ValueError:
                opc = -1

        if opc == 0:
            print("Encerrando...")

        elif opc == 1:
            usuario = None

            while usuario is None:
                username = input("Informe seu nome de usuário: ")
                resultado = list_by_username(username)

                if len(resultado) == 0:
                    print("Usuário informado não existe.")
                else:
                    usuario = resultado[0]

            senha = input("Informe a senha: ")

            password_matches = bcrypt.checkpw(
                senha.encode("utf-8"),
                usuario["senha"].encode("utf-8")
            )

            if password_matches:
                run_home(usuario)
            else:
                print("Senha incorreta!")

        elif opc == 2:
            usuario = {
                "nome": None,
                "username": None,
                "senha": None,
                "data_nascimento": None
            }

            usuario["nome"] = input("Informe o seu nome: ")
            usuario["username"] = input("Informe seu nome de usuário: ")

            senha = input("Informe a senha: ")

            hashed_password = bcrypt.hashpw(
                senha.encode("utf-8"),
                bcrypt.gensalt()
            )

            usuario["senha"] = hashed_password.decode("utf-8")

            data_nascimento = solicitar_data_nascimento()
            usuario["data_nascimento"] = data_nascimento.strftime("%Y-%m-%d")

            insert(usuario)

            print("Usuário cadastrado com sucesso!")