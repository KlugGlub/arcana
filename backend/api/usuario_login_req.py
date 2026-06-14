from pydantic import BaseModel

class UsuarioLoginReq(BaseModel):
    email: str
    senha: str