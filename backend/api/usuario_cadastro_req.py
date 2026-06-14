from pydantic import BaseModel

class UsuarioCadastroReq(BaseModel):
    nome: str
    email: str
    dataNascimento: str
    senha: str