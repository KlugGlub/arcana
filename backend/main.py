import cartomante
import time
from fastapi import FastAPI
from api.usuario_cadastro_req import UsuarioCadastroReq
from api.usuario_login_req import UsuarioLoginReq
from models.usuario import Usuario
from services.usuario_service import UsuarioService
from historico_leituras import historico_leituras
from fastapi.middleware.cors import CORSMiddleware
bot = cartomante.GeminiCartomante()
app = FastAPI()

# usuario = run_login()

origins = [
"http://localhost:8080",
"http://127.0.0.1:8080",
"http://localhost:5173",
"http://127.0.0.1:5173"
]

app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.post("/api/cadastro")
def cadastrar_usuario(usuario_cadastro_req: UsuarioCadastroReq):
    usuario = Usuario(
        nome=usuario_cadastro_req.nome,
        email=usuario_cadastro_req.email,
        data_nascimento=usuario_cadastro_req.dataNascimento,
        senha=usuario_cadastro_req.senha
        )

    try:
        UsuarioService.cadastrar_usuario(usuario)
    except ValueError as ve:
        return {"status": "error", "message": str(ve)}


    return {"status": "ok", "message": f"Usuário {usuario.nome} cadastrado com sucesso!"}

@app.post("/api/login")
def login(usuario_login_req: UsuarioLoginReq):
    try:
        resultado = UsuarioService.login(usuario_login_req.email, usuario_login_req.senha)
    except ValueError as ve:
        return {"status": "error", "message": str(ve)}
    except Exception as e:
        return {"status": "error", "message": f"Erro ao realizar login: {e}"}
    if resultado is not None:
        return {"status": "ok", "message": "Login realizado com sucesso!", "usuario": resultado}

    # if usuario is None:
    #     print("Encerrando o programa. Até mais!")
    #     time.sleep(2)
    # else:
    #     print(f"Olá, {usuario.nome}!")
    #     while True:
    #         entrada_usuario = input("\n Digite 1 para tiragem de amor, 2 para tiragem diária, 3 para histórico de leituras ou 'sair' para encerrar: ")
    #         if entrada_usuario.lower().strip() == "sair":
    #             print("Encerrando o programa. Até mais!")
    #             break
    #         if entrada_usuario == "1":
    #             bot.tiragem(usuario, "amor")
    #         elif entrada_usuario == "2":
    #             bot.tiragem(usuario, "diario")
    #         elif entrada_usuario == "3":
    #             historico_leituras(usuario)