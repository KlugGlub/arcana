export class Usuario {
    idUsuario?: number;
    nome?: string;
    email: string;
    dataNascimento?: string;
    senha: string;

    constructor(email: string, senha: string, nome?: string,  dataNascimento?: string, idUsuario?: number) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.senha = senha;
    }
}