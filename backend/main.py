import cartomante
import time
from fastapi import FastAPI
from api.usuario_cadastro_req import UsuarioCadastroReq
from api.usuario_login_req import UsuarioLoginReq
from api.compatibilidade_req import CompatibilidadeReq
from models.usuario import Usuario
from services.usuario_service import UsuarioService
from services.leitura_service import LeituraService
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
bot = cartomante.GeminiCartomante()
app = FastAPI()

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
        raise HTTPException(
            status_code=401,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao realizar login: {e}"
        )

    return {"status": "ok", "message": f"Usuário {usuario.nome} cadastrado com sucesso!"}

@app.post("/api/login")
def login(usuario_login_req: UsuarioLoginReq):
    try:
        resultado = UsuarioService.login(usuario_login_req.email, usuario_login_req.senha)
    except ValueError as ve:
        raise HTTPException(
            status_code=401,
            detail=str(ve)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao realizar login: {e}"
        )
    if resultado is not None:
        return {"status": "ok", "message": "Login realizado com sucesso!", "usuario": resultado}

@app.post("/api/compatibilidade")
def calcular_compatibilidade(compatibilidade_req: CompatibilidadeReq):
    try:
        resultado = LeituraService.calculo_amor(compatibilidade_req.data_nascimento1, compatibilidade_req.data_nascimento2)
        cartomante_interacao = bot.leitura_compatibilidade_interacao(resultado, compatibilidade_req.tipo_compatibilidade)
        cartomante_futuro = bot.leitura_compatibilidade_futuro(resultado, compatibilidade_req.tipo_compatibilidade)
    except ValueError as ve:
        return {"status": "error", "message": str(ve)}

    return {"status": "ok", "lista_arcanos": [arcano.to_dict() for arcano in resultado], "interacao": cartomante_interacao, "futuro": cartomante_futuro}

@app.get("/api/tiragemDiaria")
def sortear_carta():
    try:
        resultado = LeituraService.sortear_arcano()
        leitura = bot.tiragem_diaria(resultado)
        pass
    except ValueError as ve:
        return {"status": "error", "message": str(ve)}

    return {"status": "ok", "arcano": resultado, "leitura": leitura}