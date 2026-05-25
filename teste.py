from dao.usuario_dao import UsuarioDAO
from models.usuario import Usuario

usuario = Usuario(nome="João Silva", username="joaosilva", dataNascimento="1990-01-01", senha="senha123")
UsuarioDAO.inserir(usuario)

print("Usuário cadastrado com sucesso!")