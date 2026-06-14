import bcrypt
import re
from datetime import datetime
from models.usuario import Usuario
from dao.usuario_dao import UsuarioDAO


class UsuarioService:
    @staticmethod
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

    @staticmethod
    def validar_data_nascimento(data_nascimento):
        try:
            hoje = datetime.today().date()

            if data_nascimento > hoje:
                raise ValueError("A data de nascimento não pode ser no futuro.")

            return data_nascimento

        except ValueError:
            raise ValueError("Data inválida. Use o formato DD/MM/AAAA.")

    @staticmethod
    def cadastrar_usuario(usuario):
        if not UsuarioService.validar_email(usuario.email):
            raise ValueError("Email inválido.")

        try:
            usuario_existente = UsuarioDAO.procurar_por_email(usuario.email)

            if usuario_existente is not None:
                raise ValueError("Email já cadastrado.")

        except ValueError:
            raise

        except Exception as e:
            raise Exception(f"Erro ao verificar email: {e}")

        senha_hash = bcrypt.hashpw(
            usuario.senha.encode("utf-8"),
            bcrypt.gensalt()
        )

        usuario.senha = senha_hash.decode("utf-8")
        usuario.data_nascimento = UsuarioService.validar_data_nascimento(datetime.strptime(usuario.data_nascimento, "%Y-%m-%d").date())

        UsuarioDAO.criar(usuario)
        return usuario

    @staticmethod
    def login(email, senha):
        try:
             usuario = UsuarioDAO.procurar_por_email(email)
             if usuario is None:
                 raise ValueError("Credenciais inválidas.")

             if not bcrypt.checkpw(senha.encode("utf-8"), usuario.senha.encode("utf-8")):
                 raise ValueError("Credenciais inválidas.")
        except ValueError:
            raise ValueError("Credenciais inválidas.")
        
        return usuario