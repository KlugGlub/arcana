from pydantic import BaseModel

class CompatibilidadeReq(BaseModel):
    nome1: str
    nome2: str
    data_nascimento1: str
    data_nascimento2: str
    tipo_compatibilidade: str