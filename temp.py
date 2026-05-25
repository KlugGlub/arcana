import mysql.connector
from datetime import datetime
import bcrypt
from getpass import getpass


# =========================
# CONEXÃO COM O BANCO
# =========================

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SUA_SENHA",
    database="SEU_BANCO"
)

cursor = connection.cursor(dictionary=True)


# =========================
# FUNÇÕES AUXILIARES
# =========================

def validar_data(data_texto):
    try:
        data = datetime.strptime(data_texto, "%d/%m/%Y")

        # impede datas futuras
        if data.date() > datetime.now().date():
            return None

        return data.strftime("%Y-%m-%d")

    except ValueError:
        return None


def buscar_usuario(username):
    sql = "SELECT * FROM tb_usuarios WHERE username = %s"

    cursor.execute(sql, (username,))

    return cursor.fetchone()


# =========================
# CADASTRO
# =========================

def cadastrar_usuario():

    print("\n=== CADASTRO DE USUÁRIO ===")

    nome = input("Informe seu nome: ").strip()

    while True:

        username = input("Informe o username: ").strip()

        usuario_existente = buscar_usuario(username)

        if usuario_existente:
            print("Este username já existe.")
        else:
            break

    while True:

        data_nascimento = input(
            "Informe sua data de nascimento (dd/mm/aaaa): "
        )

        data_formatada = validar_data(data_nascimento)

        if data_formatada:
            break
        else:
            print("Data inválida.")

    while True:

        senha = getpass("Informe sua senha: ")

        confirmar = getpass("Confirme sua senha: ")

        if senha != confirmar:
            print("As senhas não coincidem.")
        elif len(senha) < 4:
            print("Senha muito curta.")
        else:
            break

    senha_hash = bcrypt.hashpw(
        senha.encode(),
        bcrypt.gensalt()
    )

    sql = """
        INSERT INTO tb_usuarios
        (nome, username, senha, data_nascimento)
        VALUES (%s, %s, %s, %s)
    """

    valores = (
        nome,
        username,
        senha_hash.decode(),
        data_formatada
    )

    cursor.execute(sql, valores)

    connection.commit()

    print("\nUsuário cadastrado com sucesso!")


# =========================
# LOGIN
# =========================

def fazer_login():

    print("\n=== LOGIN ===")

    username = input("Username: ")

    usuario = buscar_usuario(username)

    if not usuario:
        print("Usuário não encontrado.")
        return

    senha = getpass("Senha: ")

    senha_valida = bcrypt.checkpw(
        senha.encode(),
        usuario["senha"].encode()
    )

    if senha_valida:
        print(f"\nBem-vindo(a), {usuario['nome']}!")
    else:
        print("Senha incorreta.")


# =========================
# MENU PRINCIPAL
# =========================

def main():

    while True:

        print("""
=========================
1 - Fazer login
2 - Cadastrar usuário
0 - Sair
=========================
        """)

        try:
            opcao = int(input("Escolha uma opção: "))

        except ValueError:
            print("Digite um número válido.")
            continue

        match opcao:

            case 1:
                fazer_login()

            case 2:
                cadastrar_usuario()

            case 0:
                print("Encerrando...")
                break

            case _:
                print("Opção inválida.")


# =========================
# EXECUÇÃO
# =========================

main()

cursor.close()
connection.close()