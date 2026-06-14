export class Carta{
    id_carta: number;
    nome: string;
    numero: number;
    palavra_chave: string;

    constructor(id_carta: number, nome: string, numero: number, palavra_chave: string) {
        this.id_carta = id_carta;
        this.nome = nome;
        this.numero = numero;
        this.palavra_chave = palavra_chave;
    }
}