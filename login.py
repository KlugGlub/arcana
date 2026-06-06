import bcrypt
import re
from main import run_main
from datetime import datetime
from dao.usuario_dao import UsuarioDAO
from models.usuario import Usuario



def validar_data_nascimento(data_texto):

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

def validar_email(email):
    if not email:
        return False

    email = email.strip()

    if " " in email:
        return False

    if ".." in email:
        return False

    padrao = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    return re.match(padrao, email) is not None


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
                email = input("Informe seu email (digite Voltar para retornar ao menu principal): ")
                if email.lower() == "voltar":
                    break
                senha = input("Informe a senha: ")

                try:
                    resultado = UsuarioDAO.procurar_por_email(email)
                except Exception as e:
                    print(f"Erro ao procurar usuário: {e}")
                    break

                if resultado is None:
                    print("Credenciais inválidas. Tente novamente.")
                else:
                    usuario = resultado
                    password_matches = bcrypt.checkpw(
                        senha.encode("utf-8"),
                        usuario.senha.encode("utf-8")
                    )

                    if password_matches:
                        run_main(usuario)
                    else:
                        print("Credenciais inválidas. Tente novamente.")
                        usuario = None

        elif opc == 2:
            usuario = Usuario(None, None, None, None)

            usuario.nome = input("Informe o seu nome: ")
            while True:
                email = input("Informe seu email: ").strip()

                if not validar_email(email):
                    print("Email inválido. Tente novamente.")
                    continue

                try:
                    if UsuarioDAO.procurar_por_email(email) is not None:
                        print("Este e-mail já está cadastrado. Tente outro.")
                        continue
                except Exception as e:
                    print(f"Erro ao verificar email: {e}")
                    continue

                usuario.email = email
                break

            senha = input("Informe a senha: ")
            confirmacao_senha = input("Confirme a senha: ")

            while senha != confirmacao_senha:
                print("As senhas não coincidem. Tente novamente.")
                senha = input("Informe a senha: ")
                confirmacao_senha = input("Confirme a senha: ")

            hashed_password = bcrypt.hashpw(
                senha.encode("utf-8"),
                bcrypt.gensalt()
            )

            usuario.senha = hashed_password.decode("utf-8")

            data_nascimento = solicitar_data_nascimento()
            usuario.dataNascimento = data_nascimento.strftime("%Y-%m-%d")

            UsuarioDAO.criar(usuario)

            print("Usuário cadastrado com sucesso!")
run_login()